import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Svg, Rect, Path, Text as SvgText } from 'react-native-svg';
import { fetchProjectData, Project as ProjectType, Stage } from '../data/ipfsService';

export default function Project({ route }) {
  const { project } = route.params;
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [projectData, setProjectData] = useState<ProjectType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProjectData(project.name);
        setProjectData(data);
      } catch (err) {
        setError('Failed to load project data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [project.name]);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !projectData) {
    return (
      <View style={styles.centeredContainer}>
        <Text>{error || 'An unexpected error occurred.'}</Text>
      </View>
    );
  }

  const renderFlowChart = () => {
    if (!projectData.moneyFlow.stages) return null;

    return (
      <Svg height={projectData.moneyFlow.stages.length * 120 + 200} width="100%">
        {projectData.moneyFlow.stages.map((stage, index) => {
          const y = index * 100 + 20;
          return (
            <React.Fragment key={stage.id}>
              <Rect
                x="10%"
                y={y}
                width="80%"
                height="60"
                fill="#3498db"
                rx="10"
                ry="10"
                stroke="#2980b9"
                strokeWidth="2"
                onPress={() => setSelectedStage(stage)}
              />
              <SvgText
                x="50%"
                y={y + 35}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                {stage.name}
              </SvgText>
              {index < projectData.moneyFlow.stages.length - 1 && (
                <Path
                  d={`M 170 ${y + 60} L 170 ${y + 100}`}
                  stroke="#2c3e50"
                  strokeWidth="2"
                />
              )}

              {stage.subStages && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                  {stage.subStages.map((subStage, subIndex) => (
                    <React.Fragment key={subStage.id}>
                      <Rect
                        x={`${15 + (subIndex * 30)}%`}
                        y={y + 100}
                        width="25%"
                        height="60"
                        fill="#9b59b6"
                        rx="10"
                        ry="10"
                        stroke="#8e44ad"
                        strokeWidth="2"
                        onPress={() => setSelectedStage(subStage)}
                      />
                      <SvgText
                        x={`${15 + (subIndex * 30) + 12.5}%`}
                        y={y + 135}
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {subStage.name}
                      </SvgText>
                    </React.Fragment>
                  ))}
                </View>
              )}
            </React.Fragment>
          );
        })}
      </Svg>
    );
  };

  const renderStageDetails = () => {
    if (!selectedStage) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedStage}
        onRequestClose={() => setSelectedStage(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedStage.name}</Text>
            <Text style={styles.modalText}>Allocated: ${selectedStage.amount.toLocaleString()}</Text>
            <Text style={styles.modalText}>Spent: ${selectedStage.spent.toLocaleString()}</Text>
            <Text style={styles.modalText}>
              Remaining: ${(selectedStage.amount - selectedStage.spent).toLocaleString()}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedStage(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{projectData.name} Money Flow</Text>
      <View style={styles.budgetInfo}>
        <Text style={styles.budgetText}>Total Budget: ${projectData.budget?.toLocaleString() ?? 'N/A'}</Text>
        <Text style={styles.budgetText}>Allocated: ${projectData.moneyFlow.allocatedFunds?.toLocaleString() ?? 'N/A'}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar, 
            { 
              width: projectData.moneyFlow.allocatedFunds && projectData.budget
                ? `${(projectData.moneyFlow.allocatedFunds / projectData.budget) * 100}%`
                : '0%'
            }
          ]}
        />
      </View>
      <View style={styles.flowChartContainer}>
        {renderFlowChart()}
      </View>
      {renderStageDetails()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 20,
  },
  budgetInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
  },
  budgetText: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 25,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 12,
  },
  flowChartContainer: {
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 10,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2980b9',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

