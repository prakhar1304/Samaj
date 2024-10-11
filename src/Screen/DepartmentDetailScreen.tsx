import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { fetchDepartmentData, Department, Project } from '../data/ipfsService';


export default function DepartmentDetailScreen({ route, navigation }) {
  const { department } = route.params;
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentData, setDepartmentData] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDepartmentData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchDepartmentData(department.name);
        setDepartmentData(data);
      } catch (err) {
        setError('Failed to load department data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartmentData();
  }, [department.name]);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !departmentData) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{error || 'An unexpected error occurred.'}</Text>
      </View>
    );
  }

  const filteredProjects = departmentData.projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{departmentData.name} Department</Text>
      
      <SearchBar
        placeholder="Search projects..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Department Budget</Text>
        <Text style={styles.budgetText}>${departmentData.budget.toLocaleString()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Projects</Text>
        <FlatList
          data={filteredProjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Project }) => (
            <TouchableOpacity 
              style={styles.projectItem}
            
              onPress={() => {
                console.log(item);
                navigation.navigate('ProjectDetailScreen',
               { project: item })}}
            >
              <Text>{item.name}</Text>
              <Text style={styles.projectBudget}>${item.budget.toLocaleString()}</Text>
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
    backgroundColor: '#e0e0e0',
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
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  projectBudget: {
    fontWeight: 'bold',
  },
});

