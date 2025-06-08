import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChartPie as PieChart, TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState('2024');

  const periods = [
    { id: 'week', label: 'Hepde' },
    { id: 'month', label: 'Aý' },
    { id: 'quarter', label: 'Çärýek' },
    { id: 'year', label: 'Ýyl' },
  ];

  const monthlyData = [
    { month: 'Ýan', elektrik: 245, suw: 89, gaz: 156, total: 490 },
    { month: 'Few', elektrik: 230, suw: 92, gaz: 148, total: 470 },
    { month: 'Mar', elektrik: 220, suw: 85, gaz: 142, total: 447 },
    { month: 'Apr', elektrik: 210, suw: 88, gaz: 135, total: 433 },
    { month: 'Maý', elektrik: 200, suw: 90, gaz: 130, total: 420 },
    { month: 'Iýun', elektrik: 195, suw: 95, gaz: 125, total: 415 },
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const monthlyChange = ((currentMonth.total - previousMonth.total) / previousMonth.total) * 100;

  const yearlyStats = {
    totalSpent: 2675.50,
    averageMonthly: 445.92,
    highestBill: 490,
    lowestBill: 415,
    totalSavings: 125.30,
  };

  const utilityBreakdown = [
    { name: 'Elektrik', amount: 195, percentage: 47, color: '#f39c12' },
    { name: 'Gaz', amount: 125, percentage: 30, color: '#e74c3c' },
    { name: 'Suw', amount: 95, percentage: 23, color: '#3498db' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analitika</Text>
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

        {/* Overview Cards */}
        <View style={styles.overviewContainer}>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewValue}>TMT {currentMonth.total}</Text>
            <Text style={styles.overviewLabel}>Bu aýyň jemi</Text>
            <View style={styles.changeContainer}>
              {monthlyChange < 0 ? (
                <TrendingDown size={16} color="#2ecc71" />
              ) : (
                <TrendingUp size={16} color="#e74c3c" />
              )}
              <Text style={[
                styles.changeText,
                { color: monthlyChange < 0 ? '#2ecc71' : '#e74c3c' }
              ]}>
                {Math.abs(monthlyChange).toFixed(1)}%
              </Text>
            </View>
          </View>

          <View style={styles.overviewCard}>
            <Text style={styles.overviewValue}>TMT {yearlyStats.averageMonthly.toFixed(2)}</Text>
            <Text style={styles.overviewLabel}>Ortaça aýlyk</Text>
            <Text style={styles.overviewSubtext}>Soňky 6 aý</Text>
          </View>
        </View>

        {/* Utility Breakdown */}
        <View style={styles.breakdownCard}>
          <View style={styles.cardHeader}>
            <PieChart size={20} color="#3498db" />
            <Text style={styles.cardTitle}>Bu aýyň bölünişi</Text>
          </View>
          
          {utilityBreakdown.map((utility, index) => (
            <View key={index} style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.colorIndicator, { backgroundColor: utility.color }]} />
                <Text style={styles.breakdownName}>{utility.name}</Text>
              </View>
              <View style={styles.breakdownRight}>
                <Text style={styles.breakdownAmount}>TMT {utility.amount}</Text>
                <Text style={styles.breakdownPercentage}>{utility.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Trend */}
        <View style={styles.trendCard}>
          <View style={styles.cardHeader}>
            <TrendingUp size={20} color="#3498db" />
            <Text style={styles.cardTitle}>Aýlyk tendensiýa</Text>
          </View>
          
          <View style={styles.chartContainer}>
            {monthlyData.map((month, index) => {
              const maxValue = Math.max(...monthlyData.map(m => m.total));
              const height = (month.total / maxValue) * 120;
              
              return (
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barWrapper}>
                    <View style={[styles.bar, { height }]} />
                  </View>
                  <Text style={styles.barLabel}>{month.month}</Text>
                  <Text style={styles.barValue}>{month.total}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Yearly Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Calendar size={20} color="#3498db" />
            <Text style={styles.cardTitle}>Ýyllyk jemleýiş</Text>
          </View>
          
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>TMT {yearlyStats.totalSpent.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Jemi çykdajy</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>TMT {yearlyStats.highestBill}</Text>
              <Text style={styles.summaryLabel}>Iň ýokary hasap</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>TMT {yearlyStats.lowestBill}</Text>
              <Text style={styles.summaryLabel}>Iň pes hasap</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#2ecc71' }]}>TMT {yearlyStats.totalSavings.toFixed(2)}</Text>
              <Text style={styles.summaryLabel}>Jemi tygşytlylyk</Text>
            </View>
          </View>
        </View>

        {/* Goals */}
        <View style={styles.goalsCard}>
          <View style={styles.cardHeader}>
            <Target size={20} color="#3498db" />
            <Text style={styles.cardTitle}>Maksatlar</Text>
          </View>
          
          <View style={styles.goal}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Aýlyk tygşytlylyk maksady</Text>
              <Text style={styles.goalPercentage}>75%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={styles.goalText}>TMT 50 tygşytlylyk maksadyňyzdan TMT 37.5 ýetişildi</Text>
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
  overviewContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  overviewSubtext: {
    fontSize: 12,
    color: '#95a5a6',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  breakdownName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  breakdownRight: {
    alignItems: 'flex-end',
  },
  breakdownAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  breakdownPercentage: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  trendCard: {
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
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#95a5a6',
  },
  summaryCard: {
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
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  summaryItem: {
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  goalsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goal: {
    marginTop: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  goalPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  goalText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});