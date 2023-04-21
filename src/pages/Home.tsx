import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const todos = [...tasks]
    const taskTitleAlreadyExists = todos.find(todo => todo.title === newTaskTitle)

    if (taskTitleAlreadyExists) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    const newTodo: Task = {
      id: new Date().getMilliseconds(),
      done: false,
      title: newTaskTitle
    }

    setTasks(state => [...state, newTodo])
  }

  function handleToggleTaskDone(id: number) {
    const todos = [...tasks];
    const findTodoById = todos.find(todo => todo.id === id);

    if (!findTodoById) {
      return;
    };

    setTasks(state => {
      return state.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            done: todo.done === false ? true : false
          }
        }

        return todo
      })
    })
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim',
          onPress: () => {
            const todos = [...tasks];
            const removeTodoById = todos.filter(todo => todo.id !== id);

            setTasks(removeTodoById);
          }
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ]
    )
  }

  function handleEditTask(id: number, editedTask: string) {
    const todos = [...tasks]
    const updateTodoById = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editedTask
        }
      }

      return todo
    })

    setTasks(updateTodoById)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
