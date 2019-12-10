import React, { useState } from 'react';
import {
  Text, View, TextInput, Keyboard, TouchableWithoutFeedback, Button, StyleSheet, TouchableOpacity
} from 'react-native';
import { Switch } from 'react-native-gesture-handler';


function LabeledTextInput({
  label, value, handler, secret = false, ...props
}) {
  return (
    <View style={styles.formRow}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={handler}
        autoCapitalize="none"
        secureTextEntry={secret}
        {...props}
      />
    </View>
  );
}

export default function LoginComponent({ login, createAccount, style }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ ...styles.container, ...style }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>BEAT</Text>
          <Text style={styles.headerText}>KEEPER</Text>
        </View>
        <View style={styles.login}>
          <Text style={styles.subtitle}>Create an account or log in!</Text>
          { newAccount && (
          <LabeledTextInput
            label="Username"
            value={username}
            handler={setUsername}
          />
          )}
          <LabeledTextInput
            label="Email"
            value={email}
            handler={setEmail}
            keyboardType="email-address"
          />
          <LabeledTextInput
            label="Password"
            value={password}
            handler={setPassword}
            secret
          />
          <View style={styles.formRow}>
            <Text style={styles.label}>New Account</Text>
            <Switch
              style={{ flex: 1 }}
              value={newAccount}
              onValueChange={setNewAccount}
            />
          </View>
          <TouchableOpacity>
            <Button
              title={newAccount ? 'Create Account' : 'Log In'}
              disabled={!email || !password || (newAccount && !username)}
              style={styles.loginButton}
              onPress={() => {
                if (newAccount) {
                  createAccount(email, password, username);
                } else {
                  login(email, password);
                }
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFE632',

  },
  login: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    flex: 2,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  formRow: {
    width: '85%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white'
  },
  subtitle: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: '10%',
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    width: '65%',
    fontSize: 24,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 5,
    bottom: 5,
    color: 'white',
    padding: 2
  },
  loginButton: {
    color: 'white'
  }
});
