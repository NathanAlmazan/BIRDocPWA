import {
    Document,
    Page,
    View,
    Text,
    Font,
    StyleSheet
} from '@react-pdf/renderer';
import { Thread } from '../../api/threads/types';


const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

export default function Form2309({ thread }: { thread: Thread }) { 
    
    return (
        <Document>
            <Page style={styles.body}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCellLeft}>BIR</Text>
                            <Text style={styles.tableCellLeft}>FORM 2309</Text>
                            <Text style={styles.tableCellLeft}>(REVISED OCTOBER, 1971)</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCellRight}>BUREAU OF INTERNAL REVENUE</Text>
                            <Text style={styles.tableCellRight}>Revenue Region No. 6 - Manila</Text>
                            <Text style={styles.tableCellRight}>REFERENCE SLIP # 03-2020</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.recipientCol}>
                            <Text style={styles.tableCellLeftBold}>TO:</Text>
                            <Text style={styles.tableCellLeft}>{thread.recipient.sectionOffice.officeName}</Text>
                        </View>
                        <View style={styles.dateCol}>
                            <Text style={styles.tableCellLeftBold}>DATE:</Text>
                            <Text style={styles.tableCellLeft}>{formatInboxDate(thread.dateCreated)}</Text>
                        </View>
                </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                    <View style={styles.purposeCol}>
                    <Text style={styles.tableCellLeftBold}>SUBJECT:</Text>
                    <Text style={styles.tableCellLeft}>{thread.subject}</Text>
                    </View>
                </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.recipientCol}>
                            <Text style={styles.tableCellLeftBold}>FOR:</Text>
                            <Text style={styles.tableCellLeft}>{thread.docType.docType}</Text>
                        </View>
                        <View style={styles.dateCol}>
                            <Text style={styles.tableCellLeftBold}>DEADLINE:</Text>
                            <Text style={styles.tableCellLeft}>{formatInboxDate(thread.dateDue)}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.purposeCol}>
                            <Text style={styles.tableCellLeftBold}>OTHERS:</Text>
                            <Text style={styles.tableCellLeft}>---</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                    <View style={styles.purposeCol}>
                    <Text style={styles.tableCellLeftBold}>REMARKS (or additional instructions):</Text>
                    <Text style={styles.tableCellLeft}>{thread.messages[0].message}</Text>
                    </View>
                </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.recipientCol}>
                            <Text style={styles.tableCellLeftBold}>FROM:</Text>
                            <Text style={styles.emptyCell}></Text>
                            <Text style={styles.tableCellCenter}>{thread.author.firstName + ' ' + thread.author.lastName}</Text>
                            <Text style={styles.tableCellCenterSmall}>{thread.author.position}</Text>
                            <Text style={styles.tableCellCenterSmall}>{thread.author.officeSection.sectionOffice.officeName}</Text>
                        </View>
                        <View style={styles.dateCol}>
                            <Text style={styles.tableCellLeftBold}>Office Code: RR-6</Text>
                        </View>
                </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.purposeCol}>
                            <Text style={styles.tableCellLeftBold}>NOTE: This slip must be filled with the papers to which it is attached.</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
);
}
  
const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    table: { 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 1,
      padding: 8
    },
    tableRow: { 
      margin: "auto", 
      marginTop: 2,
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "50%"
    },
    recipientCol: { 
      width: "70%"
    },
    dateCol: { 
      width: "30%"
    },
    purposeCol: { 
      width: "100%"
    },
    tableCellLeft: { 
      margin: 2,
      fontSize: 14,
      textAlign: "left"
    },
    emptyCell: { 
      height: 30
    },
    tableCellLeftBold: { 
      margin: 2,
      fontSize: 14,
      textAlign: "left",
      fontWeight: "bold"
    },
    tableCellRight: { 
      margin: 2,
      fontSize: 14,
      textAlign: "right"
    },
    tableCellCenter: { 
        margin: 2,
        fontSize: 14,
        textAlign: "center"
    },
    tableCellCenterSmall: { 
        margin: 2,
        fontSize: 12,
        textAlign: "center"
    }
});
  