import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {API_KEY, URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET} from '../services/API';

export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      let data = await GET(`/genre/movie/list`);
      setCategories(data.genres);
    };
    getCategories();
  }, []);

  const getNameCatg = (id: any) => {
    let name = '';
    categories.map((item: any) => {
      if (item.id == id) {
        name = item.name;
      }
    });
    return name;
  };

  const loginFunction = (email: string, password: any) => {
    setLoading(true);

    axios
      .post(`${URL}/login`, {
        email,
        password,
      })
      .then(response => {
        let userInfo = response.data;
        setUserInfo({email, password, token: userInfo.token});

        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

        setLoading(false);
        console.log(response.data.token);
      })
      .catch(e => {
        console.log('Error login:::: ' + e);
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);

    setTimeout(() => {
      AsyncStorage.removeItem('userInfo');
      setUserInfo({});
      setLoading(false);
    }, 2000);
  };

  const isLogged = async () => {
    try {
      let userInfo: any = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.log(`Function logged error::: ${e}`);
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        userInfo,
        loginFunction,
        logout,
        isLogged,
        getNameCatg,
        categories,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
