import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 700 },
  ],
});

export const colors = {
  navy: '#0f172a',
  navyLight: '#1e293b',
  cyan: '#0891b2',
  white: '#ffffff',
  gray: '#64748b',
  grayLight: '#94a3b8',
  grayLighter: '#cbd5e1',
  text: '#1e293b',
  textLight: '#475569',
  border: '#e2e8f0',
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: colors.text,
    paddingTop: 72,
    paddingBottom: 72,
    paddingHorizontal: 60,
  },
  coverPage: {
    fontFamily: 'Inter',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 60,
  },
  coverLogo: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.cyan,
    letterSpacing: 2,
    marginBottom: 40,
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.navy,
    textAlign: 'center',
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 40,
  },
  coverMeta: {
    fontSize: 10,
    color: colors.grayLight,
    textAlign: 'center',
    marginBottom: 6,
  },
  coverDivider: {
    width: 60,
    height: 2,
    backgroundColor: colors.cyan,
    marginBottom: 30,
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
  },
  headerLeft: {
    fontSize: 8,
    color: colors.cyan,
    fontWeight: 600,
    letterSpacing: 1,
  },
  headerRight: {
    fontSize: 8,
    color: colors.grayLight,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: colors.grayLight,
  },
  pageNumber: {
    fontSize: 7,
    color: colors.grayLight,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.navy,
    marginBottom: 12,
    marginTop: 24,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.navy,
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
    color: colors.textLight,
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 8,
    color: colors.grayLight,
    fontStyle: 'italic',
    marginTop: 30,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
