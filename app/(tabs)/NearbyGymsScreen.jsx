import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function NearbyGymsScreen({ theme }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const gyms = [
    {
      id: "1",
      title: "Academia PowerFit",
      coordinate: { latitude: -23.561684, longitude: -46.625378 },
    },
    {
      id: "2",
      title: "Smart Gym",
      coordinate: { latitude: -23.56321, longitude: -46.654321 },
    },
    {
      id: "3",
      title: "Academia Strong Life",
      coordinate: { latitude: -23.565, longitude: -46.64 },
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Não foi possível acessar sua localização."
        );
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View
        style={[StyleSheet.container, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <View>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Você está aqui"
            pinColor="blue"
          />

          {gyms.map((gym) => (
            <Marker
              key={gym.id}
              coordinate={gym.coordinate}
              title={gym.title}
              pinColor="red"
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
