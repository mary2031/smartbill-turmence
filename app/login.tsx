import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Säwlik', 'Ähli meýdanlary dolduryň');
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(name, email, password);
      }
    } catch (error) {
      Alert.alert('Säwlik', error instanceof Error ? error.message : 'Giriş säwligi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#3498db', '#2980b9', '#1f4e79']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={styles.innerContainer}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <View style={styles.logoWrapper}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400' }} 
                  style={styles.logo}
                />
                <View style={styles.logoOverlay}>
                  <Text style={styles.logoIcon}>⚡</Text>
                </View>
              </View>
              <Text style={styles.logoText}>SmartBill</Text>
              <Text style={styles.logoSubtext}>Akylly töleg dolandyryş ulgamy</Text>
            </View>
            
            {/* Form Container */}
            <View style={styles.formContainer}>
              <View style={styles.formHeader}>
                <Text style={styles.heading}>
                  {isLogin ? 'Hoş geldiňiz' : 'Hasap döret'}
                </Text>
                <Text style={styles.subHeading}>
                  {isLogin 
                    ? 'Hasabyňyza giriň we töleglerini dolandyryň'
                    : 'Täze hasap döredip, töleglerini dolandyrmaga başlaň'}
                </Text>
              </View>

              {/* Form Fields */}
              <View style={styles.formFields}>
                {!isLogin && (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                      <User size={20} color="#7f8c8d" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Adyňyzy giriziň"
                        placeholderTextColor="#95a5a6"
                      />
                    </View>
                  </View>
                )}

                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Mail size={20} color="#7f8c8d" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="E-poçtanyzy giriziň"
                      placeholderTextColor="#95a5a6"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <Lock size={20} color="#7f8c8d" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Parolyňyzy giriziň"
                      placeholderTextColor="#95a5a6"
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity 
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#7f8c8d" />
                      ) : (
                        <Eye size={20} color="#7f8c8d" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              {isLogin && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Paroly ýatdan çykardyňyzmy?</Text>
                </TouchableOpacity>
              )}
              
              {/* Submit Button */}
              <TouchableOpacity 
                style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff\" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    {isLogin ? 'Girmek' : 'Hasap döret'}
                  </Text>
                )}
              </TouchableOpacity>
              
              {/* Toggle Button */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isLogin 
                    ? 'Hasabyňyz ýokmy? '
                    : 'Hasabyňyz barmy? '}
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                  <Text style={styles.toggleButtonText}>
                    {isLogin ? 'Hasap döret' : 'Giriň'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  logoOverlay: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  logoIcon: {
    fontSize: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  logoSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  formHeader: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  formFields: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e5e9',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#2c3e50',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#3498db',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  toggleButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '700',
  },
});