import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Task } from "./TasksList";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from '../assets/icons/trash/trash.png';

interface Props {
    index: number
    todo: Task
    toggleTaskDone: (id: number) => void
    removeTask: (id: number) => void
    editTask: (id: number, editedTask: string) => void
}

export function TaskItem({ index, todo, toggleTaskDone, removeTask, editTask }: Props) {
    const { done, title, id } = todo
    const [isEditing, setIsEditing] = useState(false)
    const [taskValue, setTaskValue] = useState(title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        handleCancelEditing()
        editTask(id, taskValue)
    }

    Keyboard.addListener('keyboardDidHide', () => {
        handleCancelEditing()
        Alert.alert('Edição de tarefas', 'Essa essa alteração não foi salva, favor tente editar novamente')
    })

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={done === true ? [styles.taskMarker, styles.taskMarkerDone] : styles.taskMarker}
                    >
                        {done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>
                    <TextInput
                        ref={textInputRef}
                        editable={isEditing}
                        value={taskValue}
                        onChangeText={(text) => setTaskValue(text)}
                        style={done ? [styles.taskText, styles.taskTextDone] : styles.taskText}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity onPress={handleCancelEditing}>
                        <Icon
                            name="x"
                            size={14}
                            color="#B2B2B2"
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleStartEditing}>
                        <Icon
                            name="edit"
                            size={14}
                            color="#B2B2B2"
                        />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={() => removeTask(id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
        padding: 0
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})
