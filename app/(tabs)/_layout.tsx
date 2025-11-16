import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#503FA7', 
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
        {/* Tab de Servicios */}
            <Tabs.Screen
            name="services"
            options={{
                title: "Servicios",
                tabBarIcon: ({ color }) => (
                <MaterialIcons name="build" size={24} color={color} />
                ),
            }}
            />


      
    </Tabs>
  );
}


