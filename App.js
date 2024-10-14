import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";
import axios from "axios";
import positions from "./src/positions";
import styles from "./style/styles";

const BASE_IMAGE_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/";

const App = () => {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [position, setPosition] = useState(null);
  const [trait, setTrait] = useState(null);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/14.20.1/data/ko_KR/champion.json`
        );
        const championsWithTrait = Object.values(response.data.data).map(
          (champion) => ({
            ...champion,
            calculatedTrait: getChampionTrait(champion.info),
            position: positions[champion.name]?.position || "알 수 없음",
            trait: Array.isArray(positions[champion.name]?.trait)
              ? positions[champion.name].trait.join(", ")
              : positions[champion.name]?.trait || "알 수 없음",
          })
        );
        setChampions(championsWithTrait);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChampions();
  }, []);

  const getChampionTrait = (info) => {
    const { attack, defense, magic } = info;
    if (attack > defense && attack > magic) return "공격형";
    if (defense > attack && defense > magic) return "방어형";
    if (magic > attack && magic > defense) return "마법형";
    return "균형형";
  };

  const renderStars = (difficulty) => {
    return difficulty > 0 ? Array(difficulty).fill("★").join("") : "★";
  };

  const handleSearch = () => {
    const foundChampion = champions.find((champ) => champ.name === searchTerm);
    setSelectedChampion(foundChampion || null);
    setSearchTerm("");
  };

  const handleHomePress = () => {
    setSelectedChampion(null);
    setPosition(null);
    setTrait(null);
  };

  const handleBackPress = () => {
    if (trait !== null) {
      setTrait(null);
    } else if (position !== null) {
      setPosition(null);
    }
  };

  const handleRandomChampion = () => {
    const randomIndex = Math.floor(Math.random() * champions.length);
    setSelectedChampion(champions[randomIndex]);
  };

  const filteredChampions =
    trait === null
      ? champions.filter(
          (champ) =>
            position === "all" || champ.position.split(", ").includes(position)
        )
      : champions.filter(
          (champ) =>
            champ.position.split(", ").includes(position) &&
            (champ.trait.includes(trait) || champ.calculatedTrait === trait)
        );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderChampionDetail = () => {
    if (!selectedChampion) return null;

    const handleChampionClick = () => {
      setSelectedChampion(null);
    };

    return (
      <TouchableOpacity
        style={styles.detailContainer}
        onPress={handleChampionClick}
      >
        <Text style={styles.detailTitle}>
          {selectedChampion.name}{" "}
          {renderStars(selectedChampion.info.difficulty)}
        </Text>
        <Text style={styles.detailSubtitle}>{selectedChampion.title}</Text>
        <Image
          source={{ uri: `${BASE_IMAGE_URL}${selectedChampion.image.full}` }}
          style={styles.championImage}
        />
        <Text style={styles.detailBlurb}>{selectedChampion.blurb}</Text>
        <Text style={styles.detailStats}>
          포지션:{" "}
          {selectedChampion.position
            .split(", ")
            .map((pos) =>
              pos === "top"
                ? "탑"
                : pos === "mid"
                ? "미드"
                : pos === "jungle"
                ? "정글"
                : pos === "support"
                ? "서폿"
                : pos === "adc"
                ? "원딜"
                : "알 수 없음"
            )
            .join(", ")}
        </Text>
        <Text style={styles.detailStats}>성향: {selectedChampion.trait}</Text>
        <Text style={styles.detailStats}>
          계산된 성향: {selectedChampion.calculatedTrait}
        </Text>
        <Text style={styles.detailStats}>
          공격: {selectedChampion.info.attack}
        </Text>
        <Text style={styles.detailStats}>
          방어: {selectedChampion.info.defense}
        </Text>
        <Text style={styles.detailStats}>
          마법: {selectedChampion.info.magic}
        </Text>
        <Text style={styles.detailStats}>
          난이도: {selectedChampion.info.difficulty}
        </Text>
        <Text style={styles.detailStats}>
          체력: {selectedChampion.stats.hp}
        </Text>
        <Text style={styles.detailStats}>
          마나: {selectedChampion.stats.mp}
        </Text>
        <Text style={styles.detailStats}>
          이동 속도: {selectedChampion.stats.movespeed}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.centeredContainer}>
        <TouchableOpacity
          style={[styles.homeButton, styles.shrinkedHome]}
          onPress={handleHomePress}
        >
          <Text style={styles.homeButtonText}>홈</Text>
        </TouchableOpacity>

        <View style={[styles.searchContainer, styles.shrinked]}>
          <TextInput
            style={[styles.searchInput, styles.shrinked]}
            placeholder="챔피언 이름 검색"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={{
              backgroundColor: "rgba(0, 123, 255, 1)",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>검색</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleRandomChampion}
          style={{
            backgroundColor: "rgba(0, 123, 255, 1)",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            랜덤 챔피언 추천
          </Text>
        </TouchableOpacity>

        {position && (
          <TouchableOpacity onPress={() => setPosition(null)}>
            <View style={styles.filterInfoContainer}>
              <Text style={styles.filterInfo}>
                선택된 포지션:{" "}
                {position === "top"
                  ? "탑"
                  : position === "mid"
                  ? "미드"
                  : position === "jungle"
                  ? "정글"
                  : position === "support"
                  ? "서폿"
                  : position === "adc"
                  ? "원딜"
                  : "모두"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {trait && (
          <TouchableOpacity onPress={() => setTrait(null)}>
            <Text style={styles.filterInfo}>선택된 성향: {trait}</Text>
          </TouchableOpacity>
        )}
      </View>

      {position === null ? (
        <View>
          <Text style={styles.selectTitle}>선택해서 추천받기</Text>
          <View style={styles.positionFilter}>
            {["top", "mid", "jungle", "support", "adc"].map((pos) => (
              <TouchableOpacity
                key={pos}
                onPress={() => setPosition(pos)}
                style={{
                  backgroundColor: "rgba(0, 123, 255, 1)",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {pos === "all"
                    ? "모두"
                    : pos === "top"
                    ? "탑"
                    : pos === "mid"
                    ? "미드"
                    : pos === "jungle"
                    ? "정글"
                    : pos === "support"
                    ? "서폿"
                    : pos === "adc"
                    ? "원딜"
                    : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : trait === null ? (
        <View>
          <Text style={styles.selectTitle}>선택해서 추천받기</Text>
          <View style={styles.positionFilter}>
            {[
              "공격형",
              "방어형",
              "마법형",
              "균형형",
              "딜탱",
              "후반",
              "피지컬",
              "뇌지컬",
              "힙스터",
              "픽률높은",
              "뚜벅이",
              "이쁨",
              "생존기",
            ].map((t) => (
              <Button key={t} title={t} onPress={() => setTrait(t)} />
            ))}
          </View>
        </View>
      ) : filteredChampions.length === 0 ? (
        <Text
          style={{
            color: "blue",
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          해당 챔피언이 없습니다.
        </Text>
      ) : (
        <FlatList
          data={filteredChampions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                setSelectedChampion(
                  selectedChampion && selectedChampion.id === item.id
                    ? null
                    : item
                )
              }
            >
              <View style={styles.card}>
                <Text style={styles.title}>
                  {item.name} {renderStars(item.info.difficulty)}
                </Text>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {renderChampionDetail()}
    </View>
  );
};

export default App;
