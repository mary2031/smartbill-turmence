import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, Brain, TriangleAlert as AlertTriangle, Target, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function PredictionsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'month', label: 'Indiki aý' },
    { id: 'quarter', label: 'Indiki çärýek' },
    { id: 'year', label: 'Indiki ýyl' },
  ];

  const predictions = {
    month: {
      total: 275.30,
      change: -3.2,
      confidence: 85,
      utilities: [
        { name: 'Elektrik', predicted: 185.50, actual: 195.00, change: -5.1 },
        { name: 'Suw', predicted: 42.80, actual: 45.20, change: -5.3 },
        { name: 'Gaz', predicted: 47.00, actual: 49.30, change: -4.7 },
      ]
    },
    quarter: {
      total: 825.90,
      change: -2.8,
      confidence: 78,
      utilities: [
        { name: 'Elektrik', predicted: 556.50, actual: 585.00, change: -4.9 },
        { name: 'Suw', predicted: 128.40, actual: 135.60, change: -5.3 },
        { name: 'Gaz', predicted: 141.00, actual: 147.90, change: -4.7 },
      ]
    },
    year: {
      total: 3304.60,
      change: -1.5,
      confidence: 72,
      utilities: [
        { name: 'Elektrik', predicted: 2226.00, actual: 2340.00, change: -4.9 },
        { name: 'Suw', predicted: 513.60, actual: 542.40, change: -5.3 },
        { name: 'Gaz', predicted: 565.00, actual: 591.60, change: -4.5 },
      ]
    }
  };

  const currentPrediction = predictions[selectedPeriod as keyof typeof predictions];

  const insights = [
    {
      type: 'positive',
      title: 'Elektrik tygşytlylygy',
      description: 'LED lampalar we energiýa tygşytly enjamlar sebäpli elektrik tygşytlylygyňyz 5% azalar',
      impact: 'TMT 25.50 tygşytlylyk'
    },
    {
      type: 'warning',
      title: 'Gyş möwsümi',
      description: 'Gyş aýlarynda gaz tygşytlylygy 15% artmaga garaşylýar',
      impact: 'TMT 18.75 goşmaça çykdajy'
    },
    {
      type: 'neutral',
      title: 'Suw tygşytlylygy',
      description: 'Suw tygşytlylygyňyz yzygiderli azalýar we bu tendensiýa dowam eder',
      impact: 'TMT 12.30 tygşytlylyk'
    }
  ];

  const recommendations = [
    {
      title: 'Akylly termostat guruň',
      description: 'Otag temperaturasyny awtomatiki dolandyrmak bilen 20% gaz tygşytlyp bilersiňiz',
      savings: 'TMT 35.60/aý',
      difficulty: 'Orta'
    },
    {
      title: 'Suw akym çäklendiriji ulanmak',
      description: 'Duş we kran üçin akym çäklendiriji gurmak bilen suw tygşytlyp bilersiňiz',
      savings: 'TMT 15.20/aý',
      difficulty: 'Aňsat'
    },
    {
      title: 'Güneş panelleri guraň',
      description: 'Güneş energiýasy bilen elektrik tygşytlylygyňyzy ep-esli azaldyp bilersiňiz',
      savings: 'TMT 85.40/aý',
      difficulty: 'Kyn'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp size={20} color="#2ecc71" />;
      case 'warning':
        return <AlertTriangle size={20} color="#f39c12" />;
      default:
        return <Brain size={20} color="#3498db" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Aňsat':
        return '#2ecc71';
      case 'Orta':
        return '#f39c12';
      case 'Kyn':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
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
        <Text style={styles.headerTitle}>Çaklamalar</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodTab,
                selectedPeriod === period.id && styles.activePeriodTab
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodTabText,
                selectedPeriod === period.id && styles.activePeriodText
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Prediction Card */}
        <View style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <Brain size={24} color="#3498db" />
            <Text style={styles.predictionTitle}>AI Çaklamasy</Text>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>{currentPrediction.confidence}% ygtybarlylyk</Text>
            </View>
          </View>
          
          <View style={styles.predictionMain}>
            <Text style={styles.predictionAmount}>TMT {currentPrediction.total.toFixed(2)}</Text>
            <View style={styles.predictionChange}>
              <TrendingUp 
                size={16} 
                color={currentPrediction.change < 0 ? '#2ecc71' : '#e74c3c'} 
              />
              <Text style={[
                styles.changeText,
                { color: currentPrediction.change < 0 ? '#2ecc71' : '#e74c3c' }
              ]}>
                {Math.abs(currentPrediction.change)}% 
                {currentPrediction.change < 0 ? ' azalma' : ' artma'}
              </Text>
            </View>
          </View>

          <Text style={styles.predictionSubtext}>
            Öňki döwür bilen deňeşdirilende çaklanan üýtgeşme
          </Text>
        </View>

        {/* Utility Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.cardTitle}>Hyzmat boýunça çaklamalar</Text>
          
          {currentPrediction.utilities.map((utility, index) => (
            <View key={index} style={styles.utilityItem}>
              <View style={styles.utilityHeader}>
                <Text style={styles.utilityName}>{utility.name}</Text>
                <Text style={[
                  styles.utilityChange,
                  { color: utility.change < 0 ? '#2ecc71' : '#e74c3c' }
                ]}>
                  {utility.change}%
                </Text>
              </View>
              <View style={styles.utilityAmounts}>
                <Text style={styles.predictedAmount}>TMT {utility.predicted.toFixed(2)}</Text>
                <Text style={styles.actualAmount}>vs TMT {utility.actual.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* AI Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.cardHeader}>
            <Brain size={20} color="#3498db" />
            <Text style={styles.cardTitle}>AI Düşünjeleri</Text>
          </View>
          
          {insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <View style={styles.insightHeader}>
                {getInsightIcon(insight.type)}
                <Text style={styles.insightTitle}>{insight.title}</Text>
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <Text style={styles.insightImpact}>{insight.impact}</Text>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsCard}>
          <View style={styles.cardHeader}>
            <Target size={20} color="#3498db" />
            <Text style={styles.cardTitle}>Tygşytlylyk maslahatlar</Text>
          </View>
          
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <View style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(rec.difficulty) }
                ]}>
                  <Text style={styles.difficultyText}>{rec.difficulty}</Text>
                </View>
              </View>
              <Text style={styles.recommendationDescription}>{rec.description}</Text>
              <Text style={styles.recommendationSavings}>Çaklanan tygşytlylyk: {rec.savings}</Text>
            </View>
          ))}
        </View>

        {/* Forecast Accuracy */}
        <View style={styles.accuracyCard}>
          <View style={styles.cardHeader}>
            <Calendar size={20} color="#3498db" />
            <Text style={styles.cardTitle}>Çaklama takyklygy</Text>
          </View>
          
          <View style={styles.accuracyStats}>
            <View style={styles.accuracyStat}>
              <Text style={styles.accuracyValue}>92%</Text>
              <Text style={styles.accuracyLabel}>Soňky aý</Text>
            </View>
            <View style={styles.accuracyStat}>
              <Text style={styles.accuracyValue}>88%</Text>
              <Text style={styles.accuracyLabel}>Soňky 3 aý</Text>
            </View>
            <View style={styles.accuracyStat}>
              <Text style={styles.accuracyValue}>85%</Text>
              <Text style={styles.accuracyLabel}>Soňky 6 aý</Text>
            </View>
          </View>
          
          <Text style={styles.accuracyNote}>
            AI modelimiz wagtyň geçmegi bilen has takyk bolýar we siziň ulanylýan maglumatlaryna esaslanýar.
          </Text>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activePeriodTab: {
    backgroundColor: '#3498db',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  activePeriodText: {
    color: '#ffffff',
  },
  predictionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    flex: 1,
    marginLeft: 8,
  },
  confidenceBadge: {
    backgroundColor: '#edf5fd',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3498db',
  },
  predictionMain: {
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  predictionChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  predictionSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  breakdownCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  utilityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  utilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  utilityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  utilityChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  utilityAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictedAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
  actualAmount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  insightsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightItem: {
    marginBottom: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 4,
  },
  insightImpact: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
  },
  recommendationsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationItem: {
    marginBottom: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  difficultyBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 4,
  },
  recommendationSavings: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2ecc71',
  },
  accuracyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accuracyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  accuracyStat: {
    flex: 1,
    alignItems: 'center',
  },
  accuracyValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  accuracyLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  accuracyNote: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    textAlign: 'center',
  },
});