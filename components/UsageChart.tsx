import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function UsageChart() {
  const [selectedUtility, setSelectedUtility] = useState('elektrik');
  
  const utilities = [
    { id: 'elektrik', name: 'Elektrik', color: '#f39c12', usage: 245, change: -12.5 },
    { id: 'suw', name: 'Suw', color: '#3498db', usage: 89, change: 5.2 },
    { id: 'gaz', name: 'Gaz', color: '#e74c3c', usage: 156, change: -8.1 },
  ];

  const selectedData = utilities.find(u => u.id === selectedUtility);
  
  // Mock data for the last 6 months
  const chartData = [
    { month: 'May', value: 280 },
    { month: 'Iýun', value: 265 },
    { month: 'Iýul', value: 290 },
    { month: 'Awg', value: 275 },
    { month: 'Sep', value: 260 },
    { month: 'Okt', value: 245 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <BarChart3 size={20} color="#3498db" />
          <Text style={styles.title}>Ulanylýan Mukdar</Text>
        </View>
        <Text style={styles.subtitle}>Soňky 6 aý</Text>
      </View>

      {/* Utility Selector */}
      <View style={styles.utilitySelector}>
        {utilities.map((utility) => (
          <TouchableOpacity
            key={utility.id}
            style={[
              styles.utilityTab,
              selectedUtility === utility.id && { backgroundColor: utility.color }
            ]}
            onPress={() => setSelectedUtility(utility.id)}
          >
            <Text style={[
              styles.utilityTabText,
              selectedUtility === utility.id && { color: '#ffffff' }
            ]}>
              {utility.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Current Usage Display */}
      <View style={styles.currentUsage}>
        <Text style={styles.currentValue}>{selectedData?.usage} kWh</Text>
        <View style={styles.changeContainer}>
          {selectedData && selectedData.change > 0 ? (
            <TrendingUp size={16} color="#2ecc71" />
          ) : (
            <TrendingDown size={16} color="#e74c3c" />
          )}
          <Text style={[
            styles.changeText,
            { color: selectedData && selectedData.change > 0 ? '#2ecc71' : '#e74c3c' }
          ]}>
            {selectedData?.change}% öňki aý bilen deňeşdirilende
          </Text>
        </View>
      </View>

      {/* Simple Bar Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {chartData.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (item.value / maxValue) * 100,
                    backgroundColor: selectedData?.color || '#3498db',
                  }
                ]}
              />
              <Text style={styles.barLabel}>{item.month}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Insights */}
      <View style={styles.insights}>
        <Text style={styles.insightTitle}>Maslahat</Text>
        <Text style={styles.insightText}>
          Bu aý elektrik tygşytlylygyňyz 12.5% azaldy. Gowy iş!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  utilitySelector: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  utilityTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  utilityTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  currentUsage: {
    alignItems: 'center',
    marginBottom: 24,
  },
  currentValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  bar: {
    width: '80%',
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  insights: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
});