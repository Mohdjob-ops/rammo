import { Link } from 'expo-router';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SiteHeader from '../components/SiteHeader';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SiteHeader activePage="home" />

      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.badge}>FRESH • HEALTHY • DELICIOUS</Text>

          <Text style={styles.title}>Fresh food made with care</Text>

          <Text style={styles.description}>
            Welcome to Romano Restaurant & Coffee. Enjoy delicious meals
            prepared with fresh ingredients in a clean and welcoming
            restaurant.
          </Text>

          <View style={styles.buttonRow}>
            <Link href="/menu" asChild>
              <Pressable
                accessibilityLabel="Explore the menu"
                accessibilityRole="link"
                style={({ pressed }) => [
                  styles.primaryButton,
                  styles.webPointer,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>Explore Menu</Text>
              </Pressable>
            </Link>

            <Link href="/contact" asChild>
              <Pressable
                accessibilityLabel="Order now"
                accessibilityRole="link"
                style={({ pressed }) => [
                  styles.secondaryButton,
                  styles.webPointer,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.secondaryButtonText}>Order Now</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.foodEmoji}>🥗</Text>
          <Text style={styles.heroCardTitle}>Fresh Every Day</Text>
          <Text style={styles.heroCardText}>
            Quality vegetables, trusted ingredients and delicious meals.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>WHY CHOOSE US?</Text>
        <Text style={styles.sectionTitle}>Food you can trust</Text>

        <View style={styles.cards}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🥬</Text>
            <Text style={styles.cardTitle}>Fresh Ingredients</Text>
            <Text style={styles.cardText}>
              Carefully selected vegetables and ingredients.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>👨‍🍳</Text>
            <Text style={styles.cardTitle}>Prepared with Care</Text>
            <Text style={styles.cardText}>
              Every meal is prepared with attention and quality.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>⚡</Text>
            <Text style={styles.cardTitle}>Fast Service</Text>
            <Text style={styles.cardText}>
              Quick and friendly service whenever you order.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLogo}>
          Romano Restaurant & Coffee
        </Text>

        <Text style={styles.footerText}>
          Fresh food • Trusted service • Happy customers
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5fbf8',
  },

  content: {
    flexGrow: 1,
  },

  hero: {
    backgroundColor: '#e6f7ef',
    paddingHorizontal: 30,
    paddingVertical: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 50,
  },

  heroText: {
    width: '50%',
    minWidth: 280,
    maxWidth: 600,
    flexGrow: 1,
  },

  badge: {
    color: '#15803d',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 14,
  },

  title: {
    color: '#0f3d2e',
    fontSize: 52,
    lineHeight: 59,
    fontWeight: '900',
    maxWidth: 570,
  },

  description: {
    color: '#475569',
    fontSize: 18,
    lineHeight: 29,
    marginTop: 18,
    maxWidth: 560,
  },

  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 28,
  },

  primaryButton: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
  },

  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#16a34a',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 10,
  },

  secondaryButtonText: {
    color: '#15803d',
    fontWeight: '900',
    fontSize: 16,
  },

  heroCard: {
    width: 330,
    minHeight: 310,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#bde3cf',
    shadowColor: '#14532d',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  foodEmoji: {
    fontSize: 96,
  },

  heroCardTitle: {
    color: '#075985',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 15,
  },

  heroCardText: {
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 10,
  },

  section: {
    paddingHorizontal: 30,
    paddingVertical: 70,
    alignItems: 'center',
  },

  sectionLabel: {
    color: '#0284c7',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.3,
  },

  sectionTitle: {
    color: '#0f3d2e',
    fontSize: 37,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 32,
    textAlign: 'center',
  },

  cards: {
    width: '100%',
    maxWidth: 1100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },

  card: {
    flex: 1,
    minWidth: 220,
    maxWidth: 340,
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#dceee5',
  },

  cardIcon: {
    fontSize: 42,
  },

  cardTitle: {
    color: '#075985',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 16,
  },

  cardText: {
    color: '#64748b',
    lineHeight: 23,
    marginTop: 9,
  },

  footer: {
    backgroundColor: '#063f5c',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },

  footerLogo: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
  },

  footerText: {
    color: '#c7e9d6',
    marginTop: 7,
    textAlign: 'center',
  },

  webPointer: Platform.select({
    web: {
      cursor: 'pointer',
    },
    default: {},
  }),

  pressed: {
    opacity: 0.72,
  },
});