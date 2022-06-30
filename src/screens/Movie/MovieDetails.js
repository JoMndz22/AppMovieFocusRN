import React, { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { GET } from '../../services/API';
import { IMG_POST_URL } from '../../config';
import P from '../../atoms/P';
import CardMovie from '../../organisms/CardMovie';
import CardSimilarMovie from '../../organisms/CardSimilarMovie';

const MovieDetails = (props) => {

    let idMovie = props.route.params.movieId;
    const { navigation } = props;

    const [infoMovie, setInfoMovie] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);

    let names = '';
    let img = `${IMG_POST_URL}${infoMovie.backdrop_path}`;

    languages.map((item) => {
        names += `${item.english_name} `;
    });


    useEffect(() => {

        const getInfoMovie = async () => {
            const data = await GET(`/movie/${idMovie}`);
            console.log(data);
            setInfoMovie(data);
            setCategories(data.genres);
            setLanguages(data.spoken_languages);
        }

        const getsimilarMovies = async () => {
            const data = await GET(`/movie/${idMovie}/similar`);
            setSimilarMovies(data.results);
        }

        getInfoMovie();
        getsimilarMovies();
    }, []);




    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{ backgroundColor: '#000' }}>
                <Image style={styles.imageStyle} source={{ uri: img }} />
            </View>
            <View style={styles.themeDv}>
                <P fSize={22} txtColor={'#fff'}>{infoMovie.original_title}</P>
            </View>

            <View style={styles.container}>
                <View style={styles.detailsMovie}>
                    <View style={styles.infoPadd}>
                        <P fSize={18}>Duration</P>
                        <P txtColor="#767676">{infoMovie.runtime} mins.</P>
                    </View>
                    <View style={styles.infoPadd}>
                        <P fSize={18}>Genre</P>
                        {
                            categories.map((item, index) => {
                                return (
                                    <P key={index} txtColor="#767676">{item.name}</P>
                                )
                            })
                        }

                    </View>
                    <View style={styles.infoPadd}>
                        <P fSize={18}>Language</P>
                        <P txtColor="#767676">{names}</P>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <P fSize={22}>Synopsis:</P>
                    <P >{infoMovie.overview}</P>
                </View>

                <View style={{ marginTop: 30 }}>
                    <P fSize={22}>Similar Movies:</P>
                </View>

            </View>


            <View style={styles.similar}>

                <View style={styles.similarContainer}>
                    {
                        (similarMovies.length > 0) ?
                            similarMovies.map((data, index) => {
                                return (
                                    <CardSimilarMovie
                                        key={index}
                                        poster_path={data.poster_path}
                                        navigation={navigation}
                                    />
                                )
                            })
                            :
                            <P fSize={22}> ** Not found **</P>
                    }
                </View>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: '#000'
    },
    detailsMovie: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    themeDv: { paddingHorizontal: 25, paddingVertical: 10, backgroundColor: '#000' },
    imageStyle: {
        width: '100%',
        height: 225,
        resizeMode: 'contain'
    },
    infoPadd: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '33.333%',
    },
    similar: { paddingTop: 10, borderTopColor: '#767676', borderTopWidth: 1, paddingTop: 25, backgroundColor: '#000' },
    similarContainer: { backgroundColor: '#000', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }
})

export default MovieDetails