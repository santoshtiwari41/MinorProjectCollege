import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import ClassNotification from "@/components/notifications/ClassNotification";
import CollegeNotification from "@/components/notifications/CollegeNotification";
import DepartmentNotification from "@/components/notifications/DepartmentNotification";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");

const Notification: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={{height: 45, backgroundColor: Colors.button}}>
      </View>
      <SegmentedControlTab
        values={["Class", "College", "Department"]}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexChange}
        tabsContainerStyle={styles.tabsContainerStyle}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabTextStyle={styles.activeTabTextStyle}
      />
      <View style={styles.content}>
        {selectedIndex === 0 && <ClassNotification />}
        {selectedIndex === 1 && <CollegeNotification />}
        {selectedIndex === 2 && <DepartmentNotification />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainerStyle: {
    height: 50,
    backgroundColor: Colors.button,
  },
  tabStyle: {
    backgroundColor: Colors.button,
    borderColor: 'transparent',
    borderBottomWidth: 2,
  },
  tabTextStyle: {
    color: "#000",
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  activeTabStyle: {
    backgroundColor: Colors.button,
    borderBottomWidth: 2,
    borderBottomColor: '#DD486E',
  },
  activeTabTextStyle: {
    color: "#209e2c", 
  },
});

export default Notification;
