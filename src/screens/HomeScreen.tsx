import React, { useEffect, useState } from 'react';
import { GetUserData } from '../interface/GetUserData';
import { ApiService } from '../services/ApiService';
import { StyleSheet, View, FlatList, Text, StatusBar, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const [userData, setUserData] = useState<GetUserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await ApiService.userData();
                setUserData(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const navigateToAddNewUser = (params: any) => {
        navigation.navigate('AddNewUserScreen', params);
    };

    const renderPostItem = ({ item }: { item: GetUserData }) => (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text numberOfLines={3} style={styles.postContent}>{item.content}</Text>
            <TouchableOpacity style={styles.editIcon} onPress={() => navigateToAddNewUser({ screenType: "edit", id: item.id, titlea: item.title, content: item.content })}>
                <Icon name='pencil' type='font-awesome' color='#161716' size={20} />
            </TouchableOpacity>
        </View>
    );

    const CustomHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Demo App</Text>
                <Icon name='add' color='#fff' size={30} onPress={() => navigateToAddNewUser({ screenType: "new" })} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.loaderText}>Loading...</Text>
                </View>) : (
                <>
                    <CustomHeader />
                    <FlatList
                        data={userData}
                        renderItem={renderPostItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.flatListContent}
                    />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? "10%" : "0%",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        fontSize: 16,
        fontStyle: 'normal',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    flatListContent: {
        marginTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    postContainer: {
        backgroundColor: '#ECECEC',
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginRight:12,
    },
    postContent: {
        fontSize: 16,
        lineHeight: 20,
    },
    editIcon: {
        position: 'absolute',
        top: '30%',
        marginLeft: 10,
        right: 10,
        transform: [{ translateY: -12 }]
    }
});

export default HomeScreen;
