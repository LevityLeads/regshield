import {
  Document,
  Page,
  Text,
  View,
} from '@react-pdf/renderer';
import { styles, colors } from './styles';
import type { DocumentSection } from '@/lib/types';

interface DocumentTemplateProps {
  title: string;
  firmName: string;
  ccoName: string;
  date: string;
  sections: DocumentSection[];
}

export default function DocumentTemplate({
  title,
  firmName,
  ccoName,
  date,
}: DocumentTemplateProps) {
  return (
    <Page size="LETTER" style={styles.coverPage}>
      <Text style={styles.coverLogo}>REGSHIELD</Text>
      <View style={styles.coverDivider} />
      <Text style={styles.coverTitle}>{title}</Text>
      <Text style={styles.coverSubtitle}>
        Prepared for {firmName}
      </Text>
      <Text style={styles.coverMeta}>Effective Date: {date}</Text>
      <Text style={styles.coverMeta}>
        Prepared by: {ccoName}, Chief Compliance Officer
      </Text>
      <Text style={styles.coverMeta}>
        Generated in accordance with SEC Regulation S-P, 17 CFR Part 248
      </Text>
    </Page>
  );
}

function ContentPage({
  sections,
  title,
  firmName,
}: {
  sections: DocumentSection[];
  title: string;
  firmName: string;
}) {
  return (
    <>
      {sections.map((section, idx) => (
        <Page key={idx} size="LETTER" style={styles.page} wrap>
          {/* Header */}
          <View style={styles.header} fixed>
            <Text style={styles.headerLeft}>REGSHIELD</Text>
            <Text style={styles.headerRight}>{firmName} | {title}</Text>
          </View>

          {/* Section content */}
          <Text style={styles.sectionTitle}>
            {idx + 1}. {section.title}
          </Text>

          {section.content.split('\n\n').map((para, pIdx) => (
            <Text key={pIdx} style={styles.paragraph}>
              {para.trim()}
            </Text>
          ))}

          {section.subsections?.map((sub, sIdx) => (
            <View key={sIdx}>
              <Text style={styles.subsectionTitle}>
                {idx + 1}.{sIdx + 1} {sub.title}
              </Text>
              {sub.content.split('\n\n').map((para, pIdx) => (
                <Text key={pIdx} style={styles.paragraph}>
                  {para.trim()}
                </Text>
              ))}
            </View>
          ))}

          {/* Footer */}
          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>
              Prepared by RegShield | This document is a compliance template, not legal advice
            </Text>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
          </View>
        </Page>
      ))}
    </>
  );
}

export function FullDocument({
  title,
  firmName,
  ccoName,
  date,
  sections,
}: DocumentTemplateProps) {
  return (
    <Document
      title={`${title} - ${firmName}`}
      author="RegShield"
      subject={`SEC Regulation S-P Compliance Document`}
      creator="RegShield (regshield.com)"
    >
      {/* Cover page */}
      <Page size="LETTER" style={{ ...styles.coverPage, backgroundColor: colors.white }}>
        <Text style={styles.coverLogo}>REGSHIELD</Text>
        <View style={styles.coverDivider} />
        <Text style={styles.coverTitle}>{title}</Text>
        <Text style={styles.coverSubtitle}>
          Prepared for {firmName}
        </Text>
        <Text style={styles.coverMeta}>Effective Date: {date}</Text>
        <Text style={styles.coverMeta}>
          Responsible Party: {ccoName}, Chief Compliance Officer
        </Text>
        <Text style={{ ...styles.coverMeta, marginTop: 20 }}>
          Prepared in accordance with SEC Regulation S-P
        </Text>
        <Text style={styles.coverMeta}>
          17 CFR Part 248 | SEC Release No. 34-100155
        </Text>
      </Page>

      {/* Content pages */}
      <ContentPage sections={sections} title={title} firmName={firmName} />
    </Document>
  );
}
