import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, FileText, Download, Calendar, Filter, TrendingUp, DollarSign } from 'lucide-react-native';

export default function ReportsScreen() {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');

  const reportTypes = [
    { id: 'monthly', label: 'Aýlyk hasabat', icon: Calendar },
    { id: 'yearly', label: 'Ýyllyk hasabat', icon: TrendingUp },
    { id: 'utility', label: 'Hyzmat boýunça', icon: DollarSign },
  ];

  const monthlyReports = [
    {
      id: '1',
      title: 'Oktýabr 2024 Hasabaty',
      period: '1 Okt - 31 Okt 2024',
      totalAmount: 284.55,
      billsCount: 3,
      status: 'completed',
      date: '2024-11-01'
    },
    {
      id: '2',
      title: 'Sentýabr 2024 Hasabaty',
      period: '1 Sen - 30 Sen 2024',
      totalAmount: 295.20,
      billsCount: 3,
      status: 'completed',
      date: '2024-10-01'
    },
    {
      id: '3',
      title: 'Awgust 2024 Hasabaty',
      period: '1 Awg - 31 Awg 2024',
      totalAmount: 312.75,
      billsCount: 3,
      status: 'completed',
      date: '2024-09-01'
    },
  ];

  const yearlyReports = [
    {
      id: '1',
      title: '2024 Ýyllyk Hasabat',
      period: '1 Ýan - 31 Dek 2024',
      totalAmount: 3540.60,
      billsCount: 36,
      status: 'in_progress',
      date: '2024-12-31'
    },
    {
      id: '2',
      title: '2023 Ýyllyk Hasabat',
      period: '1 Ýan - 31 Dek 2023',
      totalAmount: 3245.80,
      billsCount: 36,
      status: 'completed',
      date: '2023-12-31'
    },
  ];

  const utilityReports = [
    {
      id: '1',
      title: 'Elektrik Hasabaty - 2024',
      period: 'Ýan - Okt 2024',
      totalAmount: 1680.50,
      billsCount: 10,
      status: 'completed',
      date: '2024-10-31'
    },
    {
      id: '2',
      title: 'Suw Hasabaty - 2024',
      period: 'Ýan - Okt 2024',
      totalAmount: 890.20,
      billsCount: 10,
      status: 'completed',
      date: '2024-10-31'
    },
    {
      id: '3',
      title: 'Gaz Hasabaty - 2024',
      period: 'Ýan - Okt 2024',
      totalAmount: 969.90,
      billsCount: 10,
      status: 'completed',
      date: '2024-10-31'
    },
  ];

  const getReports = () => {
    switch (selectedReport) {
      case 'yearly':
        return yearlyReports;
      case 'utility':
        return utilityReports;
      default:
        return monthlyReports;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#2ecc71';
      case 'in_progress':
        return '#f39c12';
      default:
        return '#95a5a6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Taýýar';
      case 'in_progress':
        return 'Taýýarlanýar';
      default:
        return 'Garaşylýar';
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
        <Text style={styles.headerTitle}>Hasabatlar</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Report Type Selector */}
        <View style={styles.reportTypeSelector}>
          {reportTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.reportTypeTab,
                  selectedReport === type.id && styles.activeReportTypeTab
                ]}
                onPress={() => setSelectedReport(type.id)}
              >
                <IconComponent 
                  size={20} 
                  color={selectedReport === type.id ? '#ffffff' : '#3498db'} 
                />
                <Text style={[
                  styles.reportTypeText,
                  selectedReport === type.id && styles.activeReportTypeText
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <FileText size={24} color="#3498db" />
            <Text style={styles.summaryTitle}>Hasabat jemleýişi</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>{getReports().length}</Text>
              <Text style={styles.summaryStatLabel}>Jemi hasabat</Text>
            </View>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>
                {getReports().filter(r => r.status === 'completed').length}
              </Text>
              <Text style={styles.summaryStatLabel}>Taýýar</Text>
            </View>
            <View style={styles.summaryStatItem}>
              <Text style={styles.summaryStatValue}>
                TMT {getReports().reduce((sum, r) => sum + r.totalAmount, 0).toFixed(2)}
              </Text>
              <Text style={styles.summaryStatLabel}>Jemi mukdar</Text>
            </View>
          </View>
        </View>

        {/* Reports List */}
        <View style={styles.reportsSection}>
          <Text style={styles.sectionTitle}>Elýeterli hasabatlar</Text>
          
          {getReports().map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportPeriod}>{report.period}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(report.status) }
                ]}>
                  <Text style={styles.statusText}>{getStatusText(report.status)}</Text>
                </View>
              </View>
              
              <View style={styles.reportStats}>
                <View style={styles.reportStat}>
                  <Text style={styles.reportStatLabel}>Jemi mukdar</Text>
                  <Text style={styles.reportStatValue}>TMT {report.totalAmount.toFixed(2)}</Text>
                </View>
                <View style={styles.reportStat}>
                  <Text style={styles.reportStatLabel}>Hasaplar sany</Text>
                  <Text style={styles.reportStatValue}>{report.billsCount}</Text>
                </View>
              </View>
              
              {report.status === 'completed' && (
                <TouchableOpacity style={styles.downloadButton}>
                  <Download size={16} color="#3498db" />
                  <Text style={styles.downloadButtonText}>Hasabaty ýükle</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Generate New Report */}
        <View style={styles.generateSection}>
          <Text style={styles.sectionTitle}>Täze hasabat döret</Text>
          <View style={styles.generateCard}>
            <Text style={styles.generateTitle}>Ýörite hasabat döret</Text>
            <Text style={styles.generateDescription}>
              Özboluşly döwür we hyzmatlar üçin hasabat döredip bilersiňiz
            </Text>
            <TouchableOpacity style={styles.generateButton}>
              <Text style={styles.generateButtonText}>Hasabat döret</Text>
            </TouchableOpacity>
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
  filterButton: {
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
  reportTypeSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  reportTypeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeReportTypeTab: {
    backgroundColor: '#3498db',
  },
  reportTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3498db',
    marginLeft: 4,
  },
  activeReportTypeText: {
    color: '#ffffff',
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 8,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  reportsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
  },
  reportCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  reportPeriod: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  reportStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reportStat: {
    flex: 1,
  },
  reportStatLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  reportStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edf5fd',
    paddingVertical: 8,
    borderRadius: 8,
  },
  downloadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    marginLeft: 4,
  },
  generateSection: {
    marginBottom: 24,
  },
  generateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  generateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  generateDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});