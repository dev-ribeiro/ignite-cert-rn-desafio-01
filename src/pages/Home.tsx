import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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

    if(!findTodoById) {
      return;
    };

    setTasks(state => {
      return state.map(todo => {
        if(todo.id === id) {
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
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
