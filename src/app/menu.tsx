import { router } from 'expo-router';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const menuItems = [
  {
    id: 1,
    emoji: '🥗',
    name: 'Fresh Vegetable Salad',
    description:
      'Fresh vegetables, cucumber, tomato and house dressing.',
    price: '180 ETB',
  },
  {
    id: 2,
    emoji: '🍔',
    name: 'Classic Beef Burger',
    description:
      'Grilled beef, fresh lettuce, tomato, onion and cheese.',
    price: '320 ETB',
  },
  {
    id: 3,
    emoji: '🍗',
    name: 'Grilled Chicken',
    description:
      'Tender grilled chicken served with vegetables and rice.',
    price: '380 ETB',
  },
  {
    id: 4,
    emoji: '🍕',
    name: 'Vegetable Pizza',
    description:
      'Cheese, tomato, onion, green pepper and fresh herbs.',
    price: '350 ETB',
  },
  {
    id: 5,
    emoji: '🍝',
    name: 'Pasta Special',
    description:
      'Fresh pasta served with our rich homemade tomato sauce.',
    price: '300 ETB',
  },
  {
    id: 6,
    emoji: '☕',
    name: 'Ethiopian Coffee',
    description:
      'Freshly prepared traditional Ethiopian coffee.',
    price: '80 ETB',
  },
];

export default function MenuPage() {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/')}
          style={({ pressed }) => [
            styles.brandButton,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logo}>Romando Restaurant & Cafe</Text>
          <Text style={styles.logoSubtitle}>
            Fresh food, trusted service
          </Text>
        </Pressable>

        <View style={styles.navigation}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>Home</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/menu')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.activeNavigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.navigationText,
                styles.activeNavigationText,
              ]}
            >
              Menu
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/about')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>About</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/contact')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>Contact</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.badge}>FRESH • HEALTHY • DELICIOUS</Text>
        <Text style={styles.title}>Our Menu</Text>
        <Text style={styles.subtitle}>
          Choose from our freshly prepared meals and drinks.
        </Text>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuCard}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>
                {item.description}
              </Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.callToAction}>
        <Text style={styles.callToActionTitle}>
          Ready to place your order?
        </Text>

        <Text style={styles.callToActionText}>
          Contact Romando Restaurant & Cafe and we will help you.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/contact')}
          style={({ pressed }) => [
            styles.contactButton,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2026 Romando Restaurant & Cafe
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
  header: {
    width: '100%',
    minHeight: 86,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dcebe5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  brandButton: {
    alignItems: 'flex-start',
  },
  logo: {
    color: '#075985',
    fontSize: 24,
    fontWeight: '800',
  },
  logoSubtitle: {
    marginTop: 3,
    color: '#16845b',
    fontSize: 13,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  navigationButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 9,
  },
  activeNavigationButton: {
    backgroundColor: '#0f766e',
  },
  navigationText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  activeNavigationText: {
    color: '#ffffff',
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 38,
    alignItems: 'center',
    backgroundColor: '#e7f7f0',
  },
  badge: {
    marginBottom: 12,
    color: '#16845b',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  title: {
    color: '#075985',
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 650,
    marginTop: 12,
    color: '#475569',
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
  },
  menuGrid: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 22,
  },
  menuCard: {
    width: 320,
    minHeight: 300,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcebe5',
    borderRadius: 18,
    shadowColor: '#0f766e',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  emojiContainer: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dff5ea',
  },
  emoji: {
    fontSize: 66,
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  itemName: {
    color: '#075985',
    fontSize: 21,
    fontWeight: '800',
  },
  itemDescription: {
    flex: 1,
    marginTop: 9,
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
  },
  itemPrice: {
    marginTop: 18,
    color: '#16845b',
    fontSize: 19,
    fontWeight: '900',
  },
  callToAction: {
    marginHorizontal: 24,
    marginBottom: 48,
    paddingHorizontal: 24,
    paddingVertical: 38,
    alignItems: 'center',
    backgroundColor: '#075985',
    borderRadius: 20,
  },
  callToActionTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  callToActionText: {
    marginTop: 10,
    color: '#dbeafe',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  contactButton: {
    marginTop: 22,
    paddingHorizontal: 24,
    paddingVertical: 13,
    backgroundColor: '#22a06b',
    borderRadius: 10,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#064e3b',
  },
  footerText: {
    color: '#d1fae5',
    fontSize: 14,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
  webPointer: Platform.select({
    web: {
      cursor: 'pointer',
    },
    default: {},
  }),
});