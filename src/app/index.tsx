import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useEffect, useState } from "react";
import {
  availableFlights,
  findFlights,
  IFlights,
  sortFlights,
} from "@/services/Flights";
import flaightsData from "../data/vuelos.json";

export default function HomeScreen() {
  const [flaights, setFlaights] = useState<IFlights[]>(flaightsData);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleGetAvailableFlisgths = () => {
    const flights = availableFlights();
    setFlaights(flights);
    setQuery("");
  };

  const handleSortFlisgths = () => {
    const nextOrder = sortOrder === "asc" ? "desc" : "asc";
    const flights = sortFlights(nextOrder);
    setSortOrder(nextOrder);
    setFlaights(flights);
    setQuery("");
  };

  const handleQueryChange = (t: string) => {
    setQuery(t);
  };

  const handlefindFlisght = () => {
    const foundFlisghts = findFlights(query);
    setFlaights(foundFlisghts);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Lista de vuelos
          </ThemedText>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <Button
            title="Obtener vuelos disponibles"
            onPress={handleGetAvailableFlisgths}
          />
          <Button
            title={
              sortOrder === "asc"
                ? "Ordenar precio de menor a mayor"
                : "Ordenar precio de mayor a menor"
            }
            onPress={handleSortFlisgths}
          />
          <TextInput
            placeholder="Busque vuelos por destino o origen"
            style={{ color: "white" }}
            onChangeText={handleQueryChange}
            value={query}
          />
          <Button title="Buscar vuelos" onPress={handlefindFlisght} />
          <FlatList
            data={flaights}
            renderItem={({ item }) => (
              <View>
                <View style={styles.rowHeader}>
                  <Text style={{ color: "white" }}>ID: {item.id}</Text>
                  {item.asientos === 0 && (
                    <View style={styles.badgeAgotado}>
                      <Text style={styles.badgeAgotadoText}>AGOTADO</Text>
                    </View>
                  )}
                </View>
                <Text style={{ color: "white" }}>
                  Asientos: {item.asientos}
                </Text>
                <Text style={{ color: "white" }}>Destino: {item.destino}</Text>
                <Text style={{ color: "white" }}>Origen: {item.origen}</Text>
                <Text style={{ color: "white", marginBottom: "5px" }}>
                  Precio: {item.precio}
                </Text>
              </View>
            )}
          />
        </ThemedView>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.two,
  },
  badgeAgotado: {
    backgroundColor: "#D93F3F",
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.one,
  },
  badgeAgotadoText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
