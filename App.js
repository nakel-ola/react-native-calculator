import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, Row } from "./components";
import { getOperatorSymbol, handleEqual, handleNumber } from "./utils";

export default function App() {
  const [state, setState] = useState({
    currentValue: "0",
    operator: null,
    previousValue: null,
    answer: null,
  });

  const { currentValue, previousValue, operator, answer } = state;

  const handleTap = (type, value) => {
    switch (type) {
      case "number":
        return setState(handleNumber(value, state));
      case "operator":
        return setState({
          operator: value,
          previousValue: state.currentValue,
          currentValue: "0",
          answer: null,
        });
      case "equal":
        return setState(handleEqual(state));
      case "clear":
        return setState({
          currentValue: "0",
          operator: null,
          previousValue: null,
          answer: null,
        });
      case "posneg":
        return setState({
          currentValue: `${parseFloat(state.currentValue) * -1}`,
          operator: null,
          previousValue: null,
          answer: null,
        });
      case "percentage":
        return setState({
          currentValue: `${parseFloat(state.currentValue) * 0.01}`,
          operator: null,
          previousValue: null,
          answer: null,
        });

      default:
        return state;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        {previousValue ? (
          <Text style={styles.previousValue}>
            {parseFloat(previousValue).toLocaleString()}{" "}
            {getOperatorSymbol(operator)} {answer ? currentValue : null}
          </Text>
        ) : null}

        <Text style={styles.value}>
          {parseFloat(answer ?? currentValue).toLocaleString()}
        </Text>

        {/* buttons */}

        <Row>
          <Button text="C" onPress={() => handleTap("clear")} />
          <Button text="+/-" onPress={() => handleTap("posneg")} />
          <Button text="%" onPress={() => handleTap("percentage")} />

          <Button
            text="+"
            theme="accent"
            onPress={() => handleTap("operator", "+")}
          />
        </Row>

        <Row>
          <Button text="7" onPress={() => handleTap("number", 7)} />
          <Button text="8" onPress={() => handleTap("number", 8)} />
          <Button text="9" onPress={() => handleTap("number", 9)} />

          <Button
            text="-"
            theme="accent"
            onPress={() => handleTap("operator", "-")}
          />
        </Row>

        <Row>
          <Button text="4" onPress={() => handleTap("number", 4)} />
          <Button text="5" onPress={() => handleTap("number", 5)} />
          <Button text="6" onPress={() => handleTap("number", 6)} />
          <Button
            text="x"
            theme="accent"
            onPress={() => handleTap("operator", "*")}
          />
        </Row>

        <Row>
          <Button text="1" onPress={() => handleTap("number", 1)} />
          <Button text="2" onPress={() => handleTap("number", 2)} />
          <Button text="3" onPress={() => handleTap("number", 3)} />

          <Button
            text="÷"
            theme="accent"
            onPress={() => handleTap("operator", "/")}
          />
        </Row>

        <Row>
          <Button text="0" onPress={() => handleTap("number", 0)} />
          <Button text="." onPress={() => handleTap("number", ".")} />
          <Button
            text="="
            size="double"
            theme="accent"
            onPress={() => handleTap("equal")}
          />
        </Row>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  value: {
    color: "#000000",
    fontSize: 70,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },

  previousValue: {
    fontSize: 30,
    marginRight: 20,
    textAlign: "right",
    color: "#737373",
  },
});
