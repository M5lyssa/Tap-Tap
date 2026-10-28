import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen({ onBack }) {
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
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>É rapido e facil</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image 
            source={require('./assets/Vector (1).png')} 
            style={styles.inputIcon} 
            resizeMode="contain" 
          />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#999"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <Image 
            source={require('./assets/Vector.png')} 
            style={styles.inputIcon} 
            resizeMode="contain" 
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Image 
            source={require('./assets/akar-icons_phone.png')} 
            style={styles.inputIcon} 
            resizeMode="contain" 
          />
          <TextInput
            style={styles.input}
            placeholder="Celular"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Image 
            source={require('./assets/akar-icons_lock-on.png')} 
            style={styles.inputIcon} 
            resizeMode="contain" 
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Image 
            source={require('./assets/akar-icons_lock-on.png')} 
            style={styles.inputIcon} 
            resizeMode="contain" 
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Ao continuar, você concordar nossos</Text>
          <View style={styles.termsRow}>
            <TouchableOpacity>
              <Text style={styles.termLink}>Termos de Uso</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}> e </Text>
            <TouchableOpacity>
              <Text style={styles.termLink}>Politica de Privacidade</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#8B0000',
    fontWeight: '700',
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
    marginBottom: 16,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#8B0000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#8B0000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
    marginTop: 10,
  },
  footerText: {
    color: '#777777',
    fontSize: 12,
    textAlign: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  termLink: {
    color: '#8B0000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});