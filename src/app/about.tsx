import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function AboutPage() {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Romando Restaurant and Coffee home"
          accessibilityRole="link"
          onPress={() => router.push('/')}
          style={({ pressed }) => [
            styles.brand,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logo}>
            Romando{' '}
            <Text style={styles.logoBlue}>Restaurant & Coffee</Text>
          </Text>
          <Text style={styles.tagline}>Fresh food, trusted service</Text>
        </Pressable>

        <View style={styles.navigation}>
          <Pressable
            accessibilityRole="link"
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
            accessibilityRole="link"
            onPress={() => router.push('/menu')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>Menu</Text>
          </Pressable>

          <Pressable
            accessibilityRole="link"
            accessibilityState={{ selected: true }}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.activeButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.activeText}>About</Text>
          </Pressable>

          <Pressable
            accessibilityRole="link"
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
        <Text style={styles.eyebrow}>FRESH • TRUSTED • LOCAL</Text>
        <Text style={styles.title}>
          About Romando Restaurant & Coffee
        </Text>
        <Text style={styles.subtitle}>
          We prepare delicious food using fresh ingredients and serve every
          customer with care.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.storyCard}>
          <View style={styles.storyText}>
            <Text style={styles.sectionLabel}>OUR STORY</Text>

            <Text style={styles.sectionTitle}>
              Good food brings people together
            </Text>

            <Text style={styles.paragraph}>
              Romando Restaurant & Coffee was created to provide fresh, healthy
              and delicious meals in a welcoming environment. We believe
              restaurant food should be enjoyable, reliable and prepared with
              quality ingredients.
            </Text>

            <Text style={styles.paragraph}>
              From light salads to satisfying meals, every dish is prepared
              carefully for our customers. Our goal is simple: excellent food,
              trusted service and a memorable experience.
            </Text>

            <Pressable
              accessibilityRole="link"
              onPress={() => router.push('/menu')}
              style={({ pressed }) => [
                styles.primaryButton,
                styles.webPointer,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Explore Our Menu</Text>
            </Pressable>
          </View>

          <View style={styles.illustration}>
            <Text style={styles.illustrationEmoji}>🥗</Text>
            <Text style={styles.illustrationTitle}>Made Fresh</Text>
            <Text style={styles.illustrationText}>
              Quality ingredients prepared with care.
            </Text>
          </View>
        </View>

        <Text style={styles.valuesHeading}>What We Value</Text>

        <View style={styles.valuesGrid}>
          <View style={styles.valueCard}>
            <View style={styles.iconCircle}>
              <Text style={styles.valueIcon}>🌿</Text>
            </View>

            <Text style={styles.valueTitle}>Fresh Ingredients</Text>

            <Text style={styles.valueText}>
              We select quality ingredients to prepare fresh and flavorful
              meals.
            </Text>
          </View>

          <View style={styles.valueCard}>
            <View style={styles.iconCircle}>
              <Text style={styles.valueIcon}>🤝</Text>
            </View>

            <Text style={styles.valueTitle}>Trusted Service</Text>

            <Text style={styles.valueText}>
              Every customer receives friendly, respectful and dependable
              service.
            </Text>
          </View>

          <View style={styles.valueCard}>
            <View style={styles.iconCircle}>
              <Text style={styles.valueIcon}>💙</Text>
            </View>

            <Text style={styles.valueTitle}>Customer Care</Text>

            <Text style={styles.valueText}>
              Your comfort and satisfaction are at the heart of everything we
              do.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLogo}>
          Romando{' '}
          <Text style={styles.logoBlue}>Restaurant & Coffee</Text>
        </Text>

        <Text style={styles.footerText}>
          Fresh food, trusted service.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },
  pageContent: {
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 56,
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexWrap: 'wrap',
    gap: 20,
  },
  brand: {
    gap: 2,
  },
  logo: {
    color: '#174D35',
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
  },
  logoBlue: {
    color: '#087FD5',
  },
  tagline: {
    color: '#39704E',
    fontSize: 16,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  navigationButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  activeButton: {
    backgroundColor: '#087FD5',
  },
  navigationText: {
    color: '#17211C',
    fontSize: 17,
    fontWeight: '700',
  },
  activeText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  hero: {
    backgroundColor: '#E7F2EA',
    paddingHorizontal: 24,
    paddingVertical: 70,
    alignItems: 'center',
  },
  eyebrow: {
    color: '#2B7145',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 3,
    textAlign: 'center',
  },
  title: {
    color: '#0D3C29',
    fontSize: 50,
    fontWeight: '900',
    marginTop: 14,
    textAlign: 'center',
  },
  subtitle: {
    color: '#334A3D',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 14,
    maxWidth: 720,
    textAlign: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 65,
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#DDE7E0',
    padding: 38,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 38,
    shadowColor: '#153F2C',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  storyText: {
    flex: 2,
    minWidth: 280,
  },
  sectionLabel: {
    color: '#087FD5',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  sectionTitle: {
    color: '#123D2A',
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 18,
  },
  paragraph: {
    color: '#53625A',
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 15,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#087FD5',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  illustration: {
    flex: 1,
    minWidth: 240,
    backgroundColor: '#EAF5ED',
    borderRadius: 24,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationEmoji: {
    fontSize: 80,
  },
  illustrationTitle: {
    color: '#174D35',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 14,
  },
  illustrationText: {
    color: '#557060',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
  },
  valuesHeading: {
    color: '#123D2A',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 65,
    marginBottom: 28,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 22,
  },
  valueCard: {
    flex: 1,
    minWidth: 250,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E7F2EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueIcon: {
    fontSize: 35,
  },
  valueTitle: {
    color: '#174D35',
    fontSize: 21,
    fontWeight: '900',
    marginTop: 18,
  },
  valueText: {
    color: '#607067',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 9,
  },
  footer: {
    backgroundColor: '#123D2A',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 35,
  },
  footerLogo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
  footerText: {
    color: '#CFE0D5',
    fontSize: 14,
    marginTop: 6,
  },
  webPointer: {
    cursor: 'pointer',
  },
  pressed: {
    opacity: 0.75,
  },
});