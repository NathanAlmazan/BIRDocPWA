import {
    Document,
    Page,
    View,
    Text,
    Font,
    StyleSheet,
    Image
} from '@react-pdf/renderer';
import { Thread } from '../../api/threads/types';
import { Form2309Data } from '../../pages/threads/Form2309';


const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

export default function Form2309({ thread, details }: { thread: Thread, details: Form2309Data }) { 
    
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
                            <Text style={styles.tableCellRight}>{`REFERENCE SLIP # ${thread.refSlipNum}`}</Text>
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
                    <Text style={styles.tableCellLeft}>{details.subject}</Text>
                    </View>
                </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.recipientCol}>
                            <Text style={styles.tableCellLeftBold}>FOR:</Text>
                            <Text style={styles.tableCellLeft}>{thread.purpose.purposeName}</Text>
                        </View>
                        <View style={styles.dateCol}>
                            <Text style={styles.tableCellLeftBold}>DEADLINE:</Text>
                            <Text style={styles.tableCellLeft}>{formatInboxDate(thread.dateDue)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                    <View style={styles.purposeCol}>
                    <Text style={styles.tableCellLeftBold}>REMARKS (or additional instructions):</Text>
                    <Text style={styles.tableCellLeft}>{details.remarks}</Text>
                    </View>
                </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.recipientCol}>
                            <Text style={styles.tableCellLeftBold}>FROM:</Text>
                            {thread.author.signImage ? (
                                <View style={styles.signatureContainer}>
                                    <Image style={styles.signatureImage} src="https://picsum.photos/200/300?random=1" />
                                </View>
                            ) : (
                                <Text style={styles.emptyCell}></Text>
                            )}
                            <Text style={styles.tableCellCenter}>{thread.author.firstName + ' ' + thread.author.lastName}</Text>
                            <Text style={styles.tableCellCenterSmall}>{thread.author.role.roleName}</Text>
                            <Text style={styles.tableCellCenterSmall}>{thread.author.officeSection.sectionOffice.officeName}</Text>
                        </View>
                        <View style={styles.dateCol}>
                            <Text style={styles.tableCellLeftBold}>{thread.author.officeSection.sectionOffice.refNum}</Text>
                        </View>
                </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.purposeCol}>
                            <Text style={styles.tableCellLeftBoldSmall}>NOTE: This slip must be filled with the papers to which it is attached.</Text>
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
      margin: 3,
      fontSize: 11,
      textAlign: "left"
    },
    emptyCell: { 
      height: 50
    },
    tableCellLeftBold: { 
      margin: 3,
      fontSize: 11,
      textAlign: "left",
      fontWeight: "bold"
    },
  	tableCellLeftBoldSmall: { 
      margin: 3,
      fontSize: 9,
      textAlign: "left",
      fontWeight: "bold"
    },
    tableCellRight: { 
      margin: 3,
      fontSize: 11,
      textAlign: "right"
    },
    tableCellCenter: { 
        margin: 3,
        fontSize: 11,
        textAlign: "center"
    },
    tableCellCenterSmall: { 
        margin: 3,
        fontSize: 10,
        textAlign: "center"
    },
  	signatureContainer: {
    	display: "flex",
      	flexDirection: "row",
      	justifyContent: "center"
    },
  	signatureImage: {
    	width: 90,
      	height: 50
    }
});
  