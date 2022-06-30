import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IMG_POST_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import P from '../atoms/P';

const CardMovie = (props) => {

    const { id, image, title, category, date, ranking, description, navigation } = props;
    const { getNameCatg } = useContext(AuthContext);

    let img = `${IMG_POST_URL}${image}`;
    let names = '';

    category.map((item) => {
        names += '• ' + getNameCatg(item) + ' ';
    });
    var dates = new Date(`${date}`).getFullYear();

    return (
        <TouchableOpacity onPress={() => { navigation.push('MovieDetails', { movieId: id }) }} style={styles.cardContainer}>
            <Image style={styles.imageStyle} source={{ uri: img }} />
            <View style={{ padding: 10 }}>
                <P txtColor='#fff' fSize={20}>{title}</P>
                <P txtColor='#767676' fSize={18}>({dates})</P>
                <View style={{ paddingVertical: 10 }}>
                    <P txtColor='#767676' fSize={12}>{names}</P>
                </View>
                <P txtColor='#fff' fSize={13}>{description}</P>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#1e1b26',
        borderRadius: 8,
        marginBottom: 20,
        borderColor: '#000',
        borderWidth: 1,

    },
    imageStyle: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    }
})


export default CardMovie;
