import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type FormStatus = {
  type: 'error' | 'success';
  message: string;
} | null;

const WHATSAPP_NUMBER = '251908659988';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>(null);
  const [isSending, setIsSending] = useState(false);

  function updateName(value: string) {
    setName(value);
    setFormStatus(null);
  }

  function updateContact(value: string) {
    setContact(value);
    setFormStatus(null);
  }

  function updateMessage(value: string) {
    setMessage(value);
    setFormStatus(null);
  }

  function showError(title: string, errorMessage: string) {
    setFormStatus({
      type: 'error',
      message: errorMessage,
    });

    if (Platform.OS !== 'web') {
      Alert.alert(title, errorMessage);
    }
  }

  async function sendMessage() {
    const cleanName = name.trim();
    const cleanContact = contact.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanContact || !cleanMessage) {
      showError(
        'Missing information',
        'Please complete your name, contact information and message.'
      );
      return;
    }

    if (cleanName.length < 2) {
      showError('Check your name', 'Please enter your full name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[+]?[\d\s\-()]{7,20}$/;

    if (
      !emailPattern.test(cleanContact) &&
      !phonePattern.test(cleanContact)
    ) {
      showError(
        'Check your contact information',
        'Please enter a valid phone number or email address.'
      );
      return;
    }

    if (cleanMessage.length < 5) {
      showError(
        'Check your message',
        'Please enter a message containing at least 5 characters.'
      );
      return;
    }

    const whatsappMessage = [
      'Hello Romano Restaurant & Coffee,',
      '',
      `Name: ${cleanName}`,
      `Customer contact: ${cleanContact}`,
      '',
      'Message:',
      cleanMessage,
    ].join('\n');

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(whatsappMessage)}`;

    setIsSending(true);
    setFormStatus(null);

    try {
      await Linking.openURL(whatsappUrl);

      const successMessage =
        'WhatsApp opened successfully. Please press the send button in WhatsApp to deliver your message.';

      setFormStatus({
        type: 'success',
        message: successMessage,
      });

      setName('');
      setContact('');
      setMessage('');
    } catch {
      showError(
        'Unable to open WhatsApp',
        'WhatsApp could not be opened. Please check your internet connection and try again.'
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open home page"
          onPress={() => router.push('/')}
          style={({ pressed }) => [
            styles.brand,
            styles.webPointer,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.logo}>
            Romano <Text style={styles.logoBlue}>Restaurant & Coffee</Text>
          </Text>

          <Text style={styles.tagline}>Fresh food, trusted service</Text>
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
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.navigationText}>Menu</Text>
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
            accessibilityState={{ selected: true }}
            onPress={() => router.push('/contact')}
            style={({ pressed }) => [
              styles.navigationButton,
              styles.activeButton,
              styles.webPointer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.activeText}>Contact</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>WE ARE HERE TO HELP</Text>

        <Text style={styles.title}>
          Contact Romano Restaurant & Coffee
        </Text>

        <Text style={styles.subtitle}>
          Have a question, reservation request or feedback? Send us a message.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.contactGrid}>
          <View style={styles.detailsSection}>
            <Text style={styles.sectionLabel}>GET IN TOUCH</Text>

            <Text style={styles.sectionTitle}>
              We would love to hear from you
            </Text>

            <Text style={styles.description}>
              Contact us for menu questions, restaurant information,
              reservations or customer support.
            </Text>

            <View style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <Text style={styles.iconText}>📍</Text>
              </View>

              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>Visit Us</Text>

                <Text style={styles.detailValue}>
                  Jigjiga, Somali Region, Ethiopia
                </Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <Text style={styles.iconText}>📱</Text>
              </View>

              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>WhatsApp Us</Text>

                <Text style={styles.detailValue}>
                  +251 908 659 988
                </Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <Text style={styles.iconText}>✉️</Text>
              </View>

              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>Email Us</Text>

                <Text style={styles.detailValue}>
                  Add your restaurant email address
                </Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailIcon}>
                <Text style={styles.iconText}>🕒</Text>
              </View>

              <View style={styles.detailText}>
                <Text style={styles.detailTitle}>Opening Hours</Text>

                <Text style={styles.detailValue}>
                  Monday–Sunday: 8:00 AM–10:00 PM
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Send a Message</Text>

            <Text style={styles.formSubtitle}>
              Complete the form and continue to WhatsApp.
            </Text>

            {formStatus ? (
              <View
                accessibilityRole="alert"
                style={[
                  styles.statusBox,
                  formStatus.type === 'success'
                    ? styles.successBox
                    : styles.errorBox,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    formStatus.type === 'success'
                      ? styles.successText
                      : styles.errorText,
                  ]}
                >
                  {formStatus.message}
                </Text>
              </View>
            ) : null}

            <Text style={styles.label}>Your name</Text>

            <TextInput
              value={name}
              onChangeText={updateName}
              placeholder="Enter your full name"
              placeholderTextColor="#8A9690"
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              accessibilityLabel="Your name"
              editable={!isSending}
            />

            <Text style={styles.label}>Phone number or email</Text>

            <TextInput
              value={contact}
              onChangeText={updateContact}
              placeholder="Enter your contact information"
              placeholderTextColor="#8A9690"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              accessibilityLabel="Phone number or email"
              editable={!isSending}
            />

            <Text style={styles.label}>Your message</Text>

            <TextInput
              value={message}
              onChangeText={updateMessage}
              placeholder="How can we help you?"
              placeholderTextColor="#8A9690"
              style={[styles.input, styles.messageInput]}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              accessibilityLabel="Your message"
              editable={!isSending}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue to WhatsApp"
              accessibilityState={{ disabled: isSending }}
              disabled={isSending}
              onPress={sendMessage}
              style={({ pressed }) => [
                styles.sendButton,
                styles.webPointer,
                isSending && styles.sendButtonDisabled,
                pressed && !isSending && styles.sendButtonPressed,
              ]}
            >
              <Text style={styles.sendButtonText}>
                {isSending ? 'Opening WhatsApp…' : 'Send with WhatsApp'}
              </Text>
            </Pressable>

            <Text style={styles.whatsappNote}>
              You will confirm and send the message inside WhatsApp.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLogo}>
          Romano <Text style={styles.logoBlue}>Restaurant & Coffee</Text>
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
    fontSize: 32,
    lineHeight: 39,
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
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 38,
    alignItems: 'flex-start',
  },
  detailsSection: {
    flex: 1,
    minWidth: 290,
  },
  sectionLabel: {
    color: '#087FD5',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  sectionTitle: {
    color: '#123D2A',
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '900',
    marginTop: 10,
  },
  description: {
    color: '#5D6B63',
    fontSize: 17,
    lineHeight: 28,
    marginTop: 15,
    marginBottom: 25,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  detailIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E7F2EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 25,
  },
  detailText: {
    flex: 1,
  },
  detailTitle: {
    color: '#174D35',
    fontSize: 17,
    fontWeight: '900',
  },
  detailValue: {
    color: '#65726A',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
  },
  formCard: {
    flex: 1,
    minWidth: 300,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 26,
    padding: 32,
    shadowColor: '#153F2C',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  formTitle: {
    color: '#123D2A',
    fontSize: 28,
    fontWeight: '900',
  },
  formSubtitle: {
    color: '#68756E',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
    marginBottom: 24,
  },
  statusBox: {
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: '#FFF1F1',
    borderColor: '#E9A5A5',
  },
  successBox: {
    backgroundColor: '#E8F7ED',
    borderColor: '#86C99C',
  },
  statusText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  errorText: {
    color: '#A12B2B',
  },
  successText: {
    color: '#176A35',
  },
  label: {
    color: '#244B38',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#F8FAF8',
    borderWidth: 1,
    borderColor: '#CBD8CF',
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: '#17211C',
    fontSize: 16,
    marginBottom: 19,
  },
  messageInput: {
    minHeight: 140,
  },
  sendButton: {
    backgroundColor: '#087FD5',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 3,
  },
  sendButtonPressed: {
    backgroundColor: '#0569B2',
    opacity: 0.9,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  whatsappNote: {
    color: '#65726A',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#123D2A',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 35,
  },
  footerLogo: {
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  footerText: {
    color: '#CFE0D5',
    fontSize: 14,
    marginTop: 6,
  },
  webPointer: {
    cursor: Platform.OS === 'web' ? 'pointer' : 'auto',
  },
  pressed: {
    opacity: 0.75,
  },
});