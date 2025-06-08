import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calculator, Zap, Droplets, Flame } from 'lucide-react-native';

export default function CalculatorScreen() {
  const [selectedUtility, setSelectedUtility] = useState('elektrik');
  const [usage, setUsage] = useState('');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const utilities = [
    { id: 'elektrik', name: 'Elektrik', icon: Zap, unit: 'kWh', defaultRate: '0.45' },
    { id: 'suw', name: 'Suw', icon: Droplets, unit: 'm³', defaultRate: '1.20' },
    { id: 'gaz', name: 'Gaz', icon: Flame, unit: 'm³', defaultRate: '0.85' },
  ];

  const selectedUtilityData = utilities.find(u => u.id === selectedUtility);

  const calculateBill = () => {
    const usageNum = parseFloat(usage);
    const rateNum = parseFloat(rate || selectedUtilityData?.defaultRate || '0');
    
    if (usageNum && rateNum) {
      setResult(usageNum * rateNum);
    }
  };

  const resetCalculator = () => {
    setUsage('');
    setRate('');
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Töleg Hasaplayja</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.calculatorCard}>
          <View style={styles.calculatorHeader}>
            <Calculator size={24} color="#3498db" />
            <Text style={styles.calculatorTitle}>Hasap Hasaplayja</Text>
          </View>

          {/* Utility Selector */}
          <Text style={styles.sectionLabel}>Hyzmat görnüşini saýlaň</Text>
          <View style={styles.utilitySelector}>
            {utilities.map((utility) => {
              const IconComponent = utility.icon;
              return (
                <TouchableOpacity
                  key={utility.id}
                  style={[
                    styles.utilityOption,
                    selectedUtility === utility.id && styles.selectedUtility
                  ]}
                  onPress={() => {
                    setSelectedUtility(utility.id);
                    setRate(utility.defaultRate);
                  }}
                >
                  <IconComponent 
                    size={24} 
                    color={selectedUtility === utility.id ? '#ffffff' : '#3498db'} 
                  />
                  <Text style={[
                    styles.utilityOptionText,
                    selectedUtility === utility.id && styles.selectedUtilityText
                  ]}>
                    {utility.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Usage Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>
              Ulanylýan mukdar ({selectedUtilityData?.unit})
            </Text>
            <TextInput
              style={styles.input}
              value={usage}
              onChangeText={setUsage}
              placeholder={`Mukdary ${selectedUtilityData?.unit} bilen giriziň`}
              keyboardType="numeric"
            />
          </View>

          {/* Rate Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>
              Bahasy (TMT/{selectedUtilityData?.unit})
            </Text>
            <TextInput
              style={styles.input}
              value={rate}
              onChangeText={setRate}
              placeholder={`Bahany giriziň`}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>
              Standart baha: {selectedUtilityData?.defaultRate} TMT/{selectedUtilityData?.unit}
            </Text>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity 
            style={styles.calculateButton}
            onPress={calculateBill}
          >
            <Text style={styles.calculateButtonText}>Hasapla</Text>
          </TouchableOpacity>

          {/* Result */}
          {result !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Hasaplanan töleg:</Text>
              <Text style={styles.resultValue}>TMT {result.toFixed(2)}</Text>
              <View style={styles.resultBreakdown}>
                <Text style={styles.breakdownText}>
                  {usage} {selectedUtilityData?.unit} × {rate || selectedUtilityData?.defaultRate} TMT = {result.toFixed(2)} TMT
                </Text>
              </View>
            </View>
          )}

          {/* Reset Button */}
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetCalculator}
          >
            <Text style={styles.resetButtonText}>Täzeden başla</Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tygşytlylyk maslahatlar</Text>
          <View style={styles.tip}>
            <Text style={styles.tipTitle}>💡 Elektrik</Text>
            <Text style={styles.tipText}>LED lampalar ulanmak bilen 80% tygşytlylyk edip bilersiňiz</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipTitle}>💧 Suw</Text>
            <Text style={styles.tipText}>Duş wagtyny azaltmak bilen aýda 30% suw tygşytlyp bilersiňiz</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipTitle}>🔥 Gaz</Text>
            <Text style={styles.tipText}>Öý temperaturasyny 1°C azaltmak bilen 10% gaz tygşytlyp bilersiňiz</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  calculatorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  calculatorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  utilitySelector: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  utilityOption: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedUtility: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  utilityOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    marginTop: 8,
  },
  selectedUtilityText: {
    color: '#ffffff',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e5e9',
  },
  inputHint: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  calculateButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  resultBreakdown: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },
  breakdownText: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#95a5a6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
  },
  tip: {
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
});