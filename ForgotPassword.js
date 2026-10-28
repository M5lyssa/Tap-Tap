import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ForgotPasswordScreen({ onBack }) {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" backgroundColor="#ffffff" />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Image 
            source={require('./assets/famicons_arrow-back-circle.png')} 
            style={styles.backIcon} 
            resizeMode="contain" 
          />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Esqueceu sua senha?</Text>
          <Text style={styles.subtitle}>
            Digite se E-mail ou número de celular para receber um código de recuperação.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Image 
            source={require('./assets/boxicons_user-search.png')} 
            style={styles.inputIcon} 
            resizeMode="contain" 
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail ou celular"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.codeContainer}>
          <View style={styles.codeInputBox} />
          <View style={styles.codeInputBox} />
          <View style={styles.codeInputBox} />
          <View style={styles.codeInputBox} />
          <View style={styles.codeInputBox} />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Enviar código</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Não se preocupe, vamos te ajudar</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  backButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    width: 36,
    height: 36,
  },
  headerContainer: {
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
    tintColor: '#666666',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  codeInputBox: {
    width: 50,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#8B0000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    color: '#888888',
    fontSize: 13,
  },
});