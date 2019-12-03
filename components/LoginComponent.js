import React, {useState} from 'react';
import { Text, View, TextInput, Keyboard, TouchableWithoutFeedback, Button, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';



function LabeledTextInput({ label, value, handler, secret=false, ...props }) {
  return (
    <View style={styles.formRow}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={handler}
        autoCapitalize='none'
        secureTextEntry={secret}
        {...props}
      />
    </View>
  )

}

export default function LoginComponent({ login, createAccount, style }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
 
  return(
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={ { ...styles.container, ...style }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BEAT</Text>
        <Text style={styles.headerText}>KEEPER</Text>
      </View>
      <View style={styles.login}>
      <Text style={{fontSize:24,marginBottom: '5%'}}>Create an account or log in</Text>
      { newAccount && <LabeledTextInput
      label="Username"
      value={username}
      handler={setUsername}
      />}
      <LabeledTextInput
      label="Email"
      value={email}
      handler={setEmail}
      keyboardType='email-address'
      />
    <LabeledTextInput
      label="Password"
      value={password}
      handler={setPassword}
      secret={true}
      />
      <View style={styles.formRow}>
        <Text style={styles.label}>New Account</Text>
        <Switch 
        style={{flex:1}}
        value={newAccount}
        onValueChange={setNewAccount} />
      </View>
      <Button 
      title={newAccount ? 'Create Account' : 'Log In'}
      disabled={!email || !password || (newAccount && !username)}
      onPress={()=>{
        if (newAccount){
          createAccount(email, password, username);
        }else{
          login(email, password);
        }
      }}
      />
      </View>
    </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFE632',
  
  },
  login: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
        fontSize:80,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    header : {
        flex:3,
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
  formRow: {
    width: '80%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  label:{
    flex: 1,
    fontWeight:'bold',
    fontSize:16
  },
  textInput:{
    flex: 2,
    fontSize:20,
    borderStyle:'solid',
    borderColor:'#888',
    borderWidth:1,
  }
});