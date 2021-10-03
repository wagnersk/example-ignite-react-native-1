import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import {  TasksList } from '../components/TasksList';


import { Task } from '../components/TaskItem';

import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const checkAlreadyHasName = tasks.find(item=>item.title===newTaskTitle)

    if(checkAlreadyHasName){
      Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome')
      return;
    }

    const data ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done:false
    }

    setTasks(oldState=>[...oldState,data]);
 
  }

  function handleToggleTaskDone(id: number) {

       const updatedTasks = tasks.map(task => ({ ...task }))

       const foundItem = updatedTasks.find(item=>item.id ===id)

       if(!foundItem)
       return;
       
       foundItem.done= !foundItem.done
 
       setTasks(updatedTasks);
  
      
       
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim",
          onPress: () => setTasks(oldState=>oldState.filter(
          task => task.id!==id
        ) ) }
      ]
    )
  }

  function handleEditTask (taskId:number,taskNewTitle:string){

    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item=>item.id ===taskId)

    if(!foundItem)
    return;
    
    foundItem.title=taskNewTitle

    setTasks(updatedTasks);

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