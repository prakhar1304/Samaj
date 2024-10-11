import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAllData, GovernmentData, Department } from '../data/ipfsService';
import color from '../utility/color';

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [governmentData, setGovernmentData] = useState<GovernmentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAllData();
      setGovernmentData(data);
    } catch (err) {
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !governmentData) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{error || 'An unexpected error occurred.'}</Text>
        <Button title="Retry" onPress={loadData} />
      </View>
    );
  }

  const { departments, totalBudget } = governmentData;

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = departments.map(dept => ({
    name: dept.name,
    budget: dept.budget,
    color: dept.color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Government Fund Distribution</Text>
      
   

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Budget</Text>
        <Text style={styles.budgetText}>${totalBudget.toLocaleString()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Budget Distribution</Text>
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="budget"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      {/* <Button title="Refresh Data" onPress={loadData} /> */}

       

      <SearchBar
        placeholder="Search departments..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Departments</Text>
        <FlatList
          data={filteredDepartments}
          keyExtractor={(item) => item.name}
          renderItem={({ item }: { item: Department }) => (
            <TouchableOpacity 
              style={styles.departmentItem}
              onPress={() => navigation.navigate('DepartmentDetailScreen', { department: item })}
            >
              <Text>{item.name}</Text>
              <Text style={styles.departmentBudget}>${item.budget.toLocaleString()}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 16,
  
  },
  searchBarInputContainer: {
    backgroundColor: color.GREY,
    borderRadius:20,
    // marginLeft:10
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  budgetText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  departmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  departmentBudget: {
    fontWeight: 'bold',
  },
});