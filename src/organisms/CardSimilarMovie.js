import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IMG_POST_URL } from '../config';

const CardSimilarMovie = (props) => {

    const { poster_path, navigation } = props;

    let img = `${IMG_POST_URL}${poster_path}`;


    return (
        <TouchableOpacity onPress={() => navigation.push('MovieDetails', { movieId: id })} style={styles.cardSimilarContainer}>
            <Image source={{ uri: img }} style={styles.imagePoster} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    cardSimilarContainer: { width: '33.333333333%', backgroundColor: '#000', height: 200, padding: 2, borderRadius: 5 },
    imagePoster: { width: '100%', height: '100%', borderRadius: 5 }
});
export default CardSimilarMovie;