import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  centeredContainer: {
    alignItems: "center",
  },
  homeButton: {
    padding: 10,
    backgroundColor: "rgba(0, 123, 255, 1)",
    borderRadius: 5,
    marginBottom: 10,
  },
  homeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  positionFilter: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  filterInfo: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "#e0f7fa",
    padding: 10,
    borderRadius: 8,
    borderColor: "#00796b",
    borderWidth: 1,
    color: "#00796b",
    fontWeight: "bold",
  },
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  filterInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  detailSubtitle: {
    fontSize: 18,
    fontStyle: "italic",
  },
  championImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    alignSelf: "center",
  },
  detailBlurb: {
    marginVertical: 10,
  },
  detailStats: {
    fontSize: 16,
  },
  selectTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  shrinked: {
    width: "100%",
  },
  shrinkedHome: {
    width: "30%",
    marginTop: 40,
  },
});

export default styles;
