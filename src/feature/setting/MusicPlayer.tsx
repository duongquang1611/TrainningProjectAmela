import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, Animated, Share } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, { RepeatMode, State, usePlaybackState, useProgress } from 'react-native-track-player';
import { scale, ScaledSheet } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { songs } from '../../utilities/staticData';
import { Themes } from '../../assets/themes';
import { StyledText } from '../../components/base';

const { width } = Dimensions.get('window');
const setupPlayer = async () => {
    try {
        await TrackPlayer.setupPlayer({ waitForBuffer: true });
        await TrackPlayer.add(songs);
    } catch (error) {
        console.log(error);
    }
};
const togglePlayBack = async (playBackState: any) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack != null) {
        if (playBackState === State.Paused || playBackState === State.Ready || playBackState === State.Connecting) {
            await TrackPlayer.play();
        }
        if (playBackState === State.Playing) {
            await TrackPlayer.pause();
        }
    }
};

const MusicPlayer = () => {
    const playBackState = usePlaybackState();
    const isPlaying = playBackState === State.Playing;
    const progress = useProgress();
    const [songIndex, setSongIndex] = useState(0);
    const [repeatMode, setRepeatMode] = useState('off');
    const [follow, setFollow] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef<any>(null);

    const skipTo = async (trackId: number) => {
        await TrackPlayer.skip(trackId);
    };

    useEffect(() => {
        setupPlayer();
        scrollX.addListener(({ value }: any) => {
            const index = Math.round(value / width);
            skipTo(index);
            setSongIndex(index);
        });
    }, []);

    const renderSongs = () => {
        return (
            <Animated.View style={styles.mainWrapper}>
                <View style={[styles.imageWrapper, styles.elevation]}>
                    <Image source={songs[songIndex]?.artwork} style={styles.musicImage} />
                </View>
            </Animated.View>
        );
    };

    const nextSongs = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    };

    const prevSongs = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    };

    const repeatIcon = () => {
        switch (repeatMode) {
            case 'off':
                return 'repeat-off';
            case 'track':
                return 'repeat-once';
            case 'repeat':
                return 'repeat';
            default:
                return 'repeat-off';
        }
    };
    const changeRepeatMode = () => {
        switch (repeatMode) {
            case 'off':
                TrackPlayer.setRepeatMode(RepeatMode.Track);
                setRepeatMode('track');
                break;
            case 'track':
                TrackPlayer.setRepeatMode(RepeatMode.Queue);
                setRepeatMode('repeat');
                break;
            case 'repeat':
                TrackPlayer.setRepeatMode(RepeatMode.Off);
                setRepeatMode('off');
                break;
            default:
                setRepeatMode('track');
                break;
        }
    };
    const onShare = async () => {
        try {
            await Share.share({
                message: 'React Native | A framework for building native apps using React',
            });
        } catch (error: any) {
            console.log(error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <Animated.FlatList
                    ref={songSlider}
                    renderItem={renderSongs}
                    data={songs}
                    keyExtractor={(item: any) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { x: scrollX },
                                },
                            },
                        ],
                        { useNativeDriver: true },
                    )}
                />

                <View>
                    <Text style={[styles.songContent, styles.songTitle]}>{songs[songIndex]?.title}</Text>
                    <Text style={[styles.songContent, styles.songArtist]}>{songs[songIndex]?.artist}</Text>
                </View>
                <View>
                    <Slider
                        style={styles.progressBar}
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTintColor={Themes.COLORS.selectiveYellow}
                        minimumTrackTintColor={Themes.COLORS.red}
                        maximumTrackTintColor={Themes.COLORS.white}
                        onSlidingComplete={async value => {
                            await TrackPlayer.seekTo(value);
                        }}
                    />
                    <View style={styles.progressLevelDuraiton}>
                        <Text style={styles.progressLabelText}>
                            {new Date(progress.position * 1000).toLocaleTimeString().substring(3)}
                        </Text>
                        <Text style={styles.progressLabelText}>
                            {new Date((progress.duration - progress.position) * 1000).toLocaleTimeString().substring(3)}
                        </Text>
                    </View>
                </View>

                <View style={styles.musicControlsContainer}>
                    <TouchableOpacity onPress={prevSongs}>
                        <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            togglePlayBack(playBackState);
                        }}>
                        <Ionicons name={isPlaying ? 'ios-pause-circle' : 'ios-play-circle'} size={75} color="#FFD369" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextSongs}>
                        <Ionicons name="play-skip-forward-outline" size={35} color="#FFD369" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.bottomIconContainer}>
                    <TouchableOpacity onPress={() => setFollow(!follow)}>
                        <StyledText originValue={follow ? '💔' : '😡'} customStyle={{ fontSize: scale(30) }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={changeRepeatMode}>
                        <MaterialCommunityIcons
                            name={`${repeatIcon()}`}
                            size={30}
                            color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onShare}>
                        <Ionicons name="share-outline" size={30} color="#888888" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MusicPlayer;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.ebonyClay,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSection: {
        borderTopColor: Themes.COLORS.white,
        borderWidth: 2,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
    },

    bottomIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },

    mainWrapper: {
        width: '300@ms',
        justifyContent: 'center',
        marginHorizontal: '50@ms',
    },

    imageWrapper: {
        width: '300@ms',
        height: '340@vs',
        marginBottom: '25@vs',
    },
    musicImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    elevation: {
        elevation: 5,

        shadowColor: '#ccc',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
    },
    songContent: {
        textAlign: 'center',
        color: '#EEEEEE',
    },
    songTitle: {
        fontSize: '18@s',
        fontWeight: '600',
    },

    songArtist: {
        fontSize: '16@s',
        fontWeight: '300',
    },

    progressBar: {
        width: '350@ms',
        height: '40@vs',
        marginTop: '25@vs',
        flexDirection: 'row',
    },
    progressLevelDuraiton: {
        width: '340@ms',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        color: '#FFF',
    },

    musicControlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        width: '60%',
    },
});
