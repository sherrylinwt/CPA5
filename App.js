import React, { useState,useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button,Image,TextInput, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Context =React.createContext("hello")
const Stack = createNativeStackNavigator();

const MyStack = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(
      month + '/' + date + '/' + year
    );
  }, []);

  return (

    <Context.Provider value ={currentDate}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen name="About" component={AboutPage} />

        <Stack.Screen name="Bill" component={Bill} />

        <Stack.Screen name="Plan" component={Plan} />






      </Stack.Navigator>
    </NavigationContainer>
    </Context.Provider>
  );
};


const HomeScreen = ({ navigation }) => {

  return (

      <View style={{flex:1,backgroundColor:'pink'}} >
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:60, color:'darkblue'}}>Welcome to your peronsal budgeting App!</Text>
        </View>


      <View style={styles.buttonspace}>


        <Button
          color='darkblue'
          title="About"
          onPress={() =>
            navigation.navigate('About')
          }

        />

        <Button
          color='darkblue'
          title="Bill"
          onPress={() =>
            navigation.navigate('Bill')
          }
        />

        <Button
          color='darkblue'
          title="Plan"
          onPress={() =>
            navigation.navigate('Plan')
          }
        />


    </View>

    </View>

  );
};
const AboutPage = ({ navigation, route }) => {
  return <View style={{flex:1,backgroundColor:'pink'}}>
    <Context.Consumer>
        {date =><Text style={{fontSize:25,color:'darkblue'}}>{date}</Text>}
        </Context.Consumer>
    <View style={{flex:5}}><Image style={{flex: 2, height:600, width:400}}
          resizeMode="center"source={{uri:'https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/93/d0/78/93d078ad-8339-6677-e1f1-82c64787636f/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png'}}/></View>
    <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:18,color:'darkblue'}}>
    This is a personal budgeting app that helps you to keep track of your expenses and set up reminders for upcoming
    future payments and planned expenses. You can set a weekly/monthly limit of how much you are allowing yourself to
    spend and the app will let you know how much available credits you have for yourself.
    </Text>
    </View>
  </View> ;
};

const Bill = (props) => {
  const [utility, setUtility] = useState("0");
  const [rent, setRent] = useState("0");
  const [grocery, setGrocery] = useState("0");
  const [transport, setTransport] = useState("0");
  const [shopping, setShopping] = useState("0");
  const [dining, setDining] = useState("0");
  const [insurance, setInsurance] = useState("0");
  const [others, setOthers] = useState("0");
  const [cost, setCost] = useState("0");

  return (
  <View style={styles.container}>
    <Context.Consumer>
        {date =><Text>Write down your spendings for {date}</Text>}
        </Context.Consumer>
    <Text style={styles.header}>
       Daily Expenses
    </Text>
    <TextInput
          style={styles.textinput}
          placeholder="utility"
          keyboardType={'numeric'}
          onChangeText={text => {setUtility(text)}}
      />
    <TextInput
          style={styles.textinput}
          placeholder="rent"
          keyboardType={'numeric'}
          onChangeText={text => {setRent(text)}}
      />
    <TextInput
          style={styles.textinput}
          placeholder="transport"
          keyboardType={'numeric'}
          onChangeText={text => {setTransport(text)}}
      />
    <TextInput
          style={styles.textinput}
          placeholder="shopping"
          keyboardType={'numeric'}
          onChangeText={text => {setShopping(text)}}
      />
    <TextInput
          style={styles.textinput}
          placeholder="dining"
          keyboardType={'numeric'}
          onChangeText={text => {setDining(text)}}
      />
    <TextInput
          style={styles.textinput}
          placeholder="insurance"
          keyboardType={'numeric'}
          onChangeText={text => {setInsurance(text)}}
      />
    <TextInput
          style={styles.textinput}
          placeholder="others"
          keyboardType={'numeric'}
          onChangeText={text => {setOthers(text)}}
      />
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

    <Button
          color='darkblue' title='Calculate Cost'
          onPress = {() =>
               setCost(parseInt(utility)+rent+grocery+transport+shopping+dining+insurance+others)         }
      />
      </View>

    <Text> Your total spending for today is {cost} </Text>
  </View>
      );
    }

    const Plan = () => {
      const [currentDate, setCurrentDate] = useState('');

      useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setCurrentDate(
          month + '/' + date + '/' + year
        );
      }, []);



      const [category, setCategory] = useState("");
      const [cost, setCost] = useState("");
      const [limit, setLimit] = useState("");
      const [plan, setPlan] = useState([]);


      useEffect(() => {getData()}, [])

      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@plan')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setLimit(data)
            console.log('just set info, name and email')
          } else {
            console.log('just read a null value from Storage')
            setPlan([])
            setCategory("")
            setCost("")
            setLimit("")
          }
        } catch(e) {
          console.log("error in getData")
          console.dir(e)
        }
      }

      const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@plan', jsonValue)
          console.log('just stored' +jsonValue)
        } catch(e) {
          console.log("error in storeData")
          console.dir(e)
        }
      }

      const clearALLUGLY = () => {
        try {
          console.log('in clearData')
          AsycnStorage.clear()
            .then(() => {console.log('cleared data')})
        } catch(e) {
          console.log("error in clearData")
          console.dir(e)
        }
      }

      const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData")
          console.dir(e)
        }
      }

      const renderPlan = ({item}) => {
        return (
          <View style={styles.plan}>
            <Text>{item.category}</Text>
            <Text>{item.cost}</Text>
            <Text>{item.limit}</Text>
          </View>
        )
      }

      return (
        <View style={styles.container}>
          <Context.Consumer>
            {date =><Text>{date}</Text>}
          </Context.Consumer>
          <Text style={styles.header}>Future Payment Plans</Text>
          <Text style={{fontSize:12}}>
            Please make your budgeting plans by entering the cost for each category and your limit for the month!
          </Text>

          <View style={{flexDirection:'row', margin:20, justifyContent:'center'}}>
            <TextInput
              style={{fontSize:25}}
              placeholder="Category"
              onChangeText={text => {setCategory(text);}}
              value = {category}
            />

            <TextInput
              style={{fontSize:25}}
              placeholder="Cost"
              onChangeText={text => {setCost(text);}}
              value = {cost}
            />
            <TextInput
              style={{fontSize:25}}
              placeholder="Limit"
              onChangeText={text => {setLimit(text);}}
              value = {limit}
            />
          </View>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Button
              title={"Save"}
              color="lightgreen"
              onPress = {() => {
                const newPlan =
                  plan.concat(
                    {'category':category,
                     'cost':cost,
                     'limit':limit,
                     'completed': new Date()
                  })
                  setPlan(newPlan)
                  storeData(newPlan)
                  setCategory("")
                  setCost("")
                  setLimit("")

              }}
              />

            <Button
              title={"Clear"}
              color="lightblue"
              onPress = {() => {
                clearAll()
                setPlan([])
                setLimit("")
              }}
            />
          </View>
          <View style={{flexDirection:'row', justifyContent:'center', backgroundColor:"yellow"}}>
            <Text style={{fontSize:20, color:'darkblue',backgroundColor:'yellow'}}>
            Here is your payment plans for this month
            </Text>
          </View>

          <FlatList
            data={limit}
            renderItem={renderPlan}
            keyExtraction={item => item.name}
          />


        </View>
      );
    }


  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'space-around',

    },
    textinput:{
      margin:20,
      fontSize:20
    },
    header: {
      fontSize:40,
      color:'darkblue'
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonspace:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      flex:1,
      alignItems:'center'
    },
    plan:{
    flexDirection:'row',
    justifyContent:'space-between',
    },
  });
export default MyStack;
