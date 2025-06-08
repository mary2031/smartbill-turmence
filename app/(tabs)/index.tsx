import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import DashboardHeader from '@/components/DashboardHeader';
import UpcomingBillCard from '@/components/UpcomingBillCard';
import QuickActionButton from '@/components/QuickActionButton';
import RecentTransactionCard from '@/components/RecentTransactionCard';
import AlertBanner from '@/components/AlertBanner';
import UsageChart from '@/components/UsageChart';
import { getBills, getRecentTransactions } from '@/utils/mockData';
import { Bell, CreditCard, History, Settings, TrendingUp, Wallet, Calculator, PieChart, BarChart3, Zap, Droplets, Flame } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const upcomingBills = getBills().filter(bill => !bill.isPaid).slice(0, 2);
  const recentTransactions = getRecentTransactions().slice(0, 3);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const totalUnpaid = getBills()
    .filter(bill => !bill.isPaid)
    .reduce((sum, bill) => sum + bill.amount, 0);

  const monthlyAverage = 295.75;
  const savingsThisMonth = 45.20;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DashboardHeader user={user} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AlertBanner 
          message="Siziň elektrik tölegiňiz 3 günüň içinde ödenmeli" 
          type="warning"
        />
        
        {/* Enhanced Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Jemi Töleg</Text>
            <TouchableOpacity 
              style={styles.periodSelector}
              onPress={() => setSelectedPeriod(selectedPeriod === 'month' ? 'year' : 'month')}
            >
              <Text style={styles.periodText}>
                {selectedPeriod === 'month' ? 'Bu aý' : 'Bu ýyl'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.summaryAmount}>TMT {totalUnpaid.toFixed(2)}</Text>
          <Text style={styles.summarySubtext}>
            {getBills().filter(bill => !bill.isPaid).length} töleg garaşylýar
          </Text>
          
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>TMT {monthlyAverage.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Ortaça aýlyk</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#2ecc71' }]}>TMT {savingsThisMonth.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Bu aý tygşytlanan</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/bills')}
          >
            <Text style={styles.viewAllButtonText}>Bütin Tölegleri Görüp Bilmek</Text>
          </TouchableOpacity>
        </View>
        
        {/* Usage Analytics */}
        <UsageChart />
        
        {showStats && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Zap size={24} color="#f39c12" />
              </View>
              <Text style={styles.statValue}>-12.5%</Text>
              <Text style={styles.statLabel}>Elektrik tygşytlylygy</Text>
              <Text style={styles.statTrend}>Öňki aý bilen deňeşdirilende</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Droplets size={24} color="#3498db" />
              </View>
              <Text style={[styles.statValue, { color: '#2ecc71' }]}>+5.2%</Text>
              <Text style={styles.statLabel}>Suw tygşytlylygy</Text>
              <Text style={styles.statTrend}>Öňki aý bilen deňeşdirilende</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Flame size={24} color="#e74c3c" />
              </View>
              <Text style={styles.statValue}>-8.1%</Text>
              <Text style={styles.statLabel}>Gaz tygşytlylygy</Text>
              <Text style={styles.statTrend}>Öňki aý bilen deňeşdirilende</Text>
            </View>
          </View>
        )}
        
        {/* Enhanced Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Çalt Amallar</Text>
          <View style={styles.quickActions}>
            <QuickActionButton 
              icon={<CreditCard size={24} color="#3498db" />}
              label="Tölegleri Töle"
              onPress={() => router.push('/bills')}
            />
            <QuickActionButton 
              icon={<Calculator size={24} color="#3498db" />}
              label="Hasaplayja"
              onPress={() => router.push('/calculator')}
            />
            <QuickActionButton 
              icon={<PieChart size={24} color="#3498db" />}
              label="Analitika"
              onPress={() => router.push('/analytics')}
            />
            <QuickActionButton 
              icon={<Bell size={24} color="#3498db" />}
              label="Habarlar"
              onPress={() => router.push('/notifications')}
            />
          </View>
          <View style={styles.quickActions}>
            <QuickActionButton 
              icon={<History size={24} color="#3498db" />}
              label="Taryh"
              onPress={() => router.push('/history')}
            />
            <QuickActionButton 
              icon={<BarChart3 size={24} color="#3498db" />}
              label="Hasabatlar"
              onPress={() => router.push('/reports')}
            />
            <QuickActionButton 
              icon={<TrendingUp size={24} color="#3498db" />}
              label="Çaklamalar"
              onPress={() => router.push('/predictions')}
            />
            <QuickActionButton 
              icon={<Settings size={24} color="#3498db" />}
              label="Sazlamalar"
              onPress={() => router.push('/profile')}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Geljekdäki Tölegler</Text>
            <TouchableOpacity onPress={() => router.push('/bills')}>
              <Text style={styles.seeAllText}>Bütin Tölegleri Gör</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingBills.map((bill) => (
            <UpcomingBillCard 
              key={bill.id}
              bill={bill}
              onPress={() => router.push(`/bill-details/${bill.id}`)}
            />
          ))}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Soňky Amallar</Text>
            <TouchableOpacity onPress={() => router.push('/history')}>
              <Text style={styles.seeAllText}>Bütin Amallary Gör</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <RecentTransactionCard 
              key={transaction.id}
              transaction={transaction}
            />
          ))}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
  periodSelector: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  periodText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
    marginVertical: 8,
  },
  summarySubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 20,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  viewAllButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTrend: {
    fontSize: 10,
    color: '#95a5a6',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  seeAllText: {
    color: '#3498db',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});