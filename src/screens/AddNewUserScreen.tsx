import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { ApiService } from '../services/ApiService';
import { useNavigation, RouteProp } from '@react-navigation/native';

interface RootStackParamList {
    screenType: string, titlea: string, content: string;
}

interface Props {
    route: RouteProp<{ params: RootStackParamList }, 'params'>;
}

const AddNewUserScreen: React.FC<Props> = ({ route }) => {
    const { screenType, titlea, content } = route.params;
    const [title, setTitle] = useState<string>('');
    const [context, setContext] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        setTitle(titlea);
        setContext(content);
    }, [route.params])

    const CustomHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Icon name='arrow-left' type='font-awesome' color='#fff' onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>{screenType === 'edit' ? "Edit Content" : "Add New Content"}</Text>
            </View>
        );
    };

    const handleSubmit = async () => {
        if (!title || !context || !title.trim() || !context.trim()) {
            ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
            return;
        }

        let data;
        {
            screenType === "edit" ?
                data = await ApiService.addUserData(title, context) :
                data = await ApiService.updateUserData(1, title, context)
        }
        if (data === 201 || data === 200) {
            console.log("Success");
            {
                screenType === 'edit' ?
                    ToastAndroid.show("Data Updated Successfully!", ToastAndroid.SHORT) :
                    ToastAndroid.show("Data saved Successfully!", ToastAndroid.SHORT)
            }
            navigation.goBack();
        } else {
            ToastAndroid.show("SomeThing Went Wrong!", ToastAndroid.SHORT)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader />
            <View style={styles.container2}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title here..."
                    placeholderTextColor="#999"
                    value={title}
                    onChangeText={setTitle}
                />
                <Text style={styles.label}>Context:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter context here..."
                    placeholderTextColor="#999"
                    value={context}
                    onChangeText={setContext}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{screenType === 'edit' ? "Update" : "Submit"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? "10%" : "0%",
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    container2: {
        margin: 10,
    },
    label: {
        paddingHorizontal: 5,
        fontSize: 18,
        color: '#000000',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingVertical: 12,
        marginTop: 40,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default AddNewUserScreen;