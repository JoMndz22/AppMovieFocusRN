import React, { useContext, useEffect, useState } from 'react';

import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import CardMovie from '../../organisms/CardMovie';
import P from '../../atoms/P';
import { GET } from '../../services/API';

const HomeScreen = (props) => {

    const { navigation } = props;
    const { getNameCatg, logout } = useContext(AuthContext);
    const [popularMovies, setPopularMovies] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const getMovies = async () => {
            const response = await GET('/movie/popular');
            setPopularMovies(response.results);
        }
        //{userInfo.email}
        getMovies();
    }, []);

    const sendMovie = (search) => {
        navigation.push('SearchScreen', { movie: search });
        setSearch(' ');
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={styles.container}>

                <TextInput
                    style={styles.input}
                    value={search}
                    placeholderTextColor="#bbb"
                    placeholder="Search..."
                    onChangeText={text => setSearch(text)}
                    onSubmitEditing={() => sendMovie(search)}
                />



                <Text style={styles.welcome}>POPULAR MOVIES</Text>

                {
                    popularMovies.map((data, index) => {

                        return (
                            <CardMovie
                                key={index}
                                id={data.id}
                                navigation={navigation}
                                image={data.backdrop_path}
                                title={data.original_title}
                                category={data.genre_ids}
                                date={data.release_date}
                                ranking={data.popularity}
                                description={data.overview}
                            />
                        )
                    })
                }

                <Button title="Logout" color="red" onPress={logout} />
            </View>
        </ScrollView>
    )

};


const styles = StyleSheet.create({
    button: { backgroundColor: 'red', padding: 10, marginBottom: 30, borderRadius: 5 },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
        color: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#000',
        paddingVertical: 35
    },
    welcome: {
        fontSize: 22,
        marginTop: 20,
        marginBottom: 15,
        color: '#fff'
    },
    imageStyle: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }
});

export default HomeScreen;