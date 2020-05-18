import React, {Component} from 'react';
import {StyleSheet, Button, View, Text, TextInput, SafeAreaView, ScrollView} from 'react-native';
import {CheckBox} from "react-native-elements";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {list: []} 
  
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  handleAddTask(task) {
    console.log("add task");
    this.state.list.push(task);
    this.setState({list: this.state.list})
  }

  handleDeleteTask(id) {
    console.log("delete task");
    let nList = this.state.list.filter(taskDelete => {
        if(taskDelete.id !== id)
            return taskDelete;
    })
    this.setState({list: nList})
  }

  checkBox_Test(index) {
    console.log("checkbox")
    let newArr = this.state.list;
    newArr[index].checked = !newArr[index].checked;
    this.setState({list: newArr});
  }

  TaskList() {
    return this.state.list.map((t,index) => {
      return (
        <View>
            <CheckBox title={"Task to do: "+t.name + " Created date" + t.dueDate.getDate()+"-"+(t.dueDate.getMonth()+1)+"-"+t.dueDate.getFullYear()} 
            checked={t.checked} 
            onPress = {() => this.checkBox_Test(index)}
            />
            <Button 
            title="Delete" 
            color="#f194ff" 
            onPress={() => this.handleDeleteTask(t.id)}
            />
        </View>
      )
    })
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>To Do List App</Text>
          <TaskNameForm onAddTask={this.handleAddTask}/>
        </View>
        <View>
          <Text> Tasks List</Text>
          <ScrollView>{this.TaskList()}</ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

export class TaskNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const taskList = this.props.taskList;
    // create a task object
    event.preventDefault();
    const task = {id:Date.now(), name: this.state.TextInputValue, 
    dueDate: new Date(), checked: false};
    // add the task object to the task list
    this.props.onAddTask(task);
    this.setState({TextInputValue: ''})
  }
   
  handleChange(event) {
    // code to set the state of the component
    this.setState({TextInputValue: event});
  }

  render() {
    return (
      <View>
        <TextInput 
        style={{ height: 40, borderColor: 'black', borderWidth: 1 }} 
        placeholder={"Enter Task"} value = {this.state.TextInputValue} 
        onChangeText = {this.handleChange}
        />
        <Button 
        title="Add Task" 
        color="#f194ff" 
        onPress = {this.handleSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingTop: 30,
    // justifyContent: 'center',
  },
});