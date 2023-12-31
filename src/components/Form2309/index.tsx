import {
    Document,
    Page,
    View,
    Text,
    Font,
    StyleSheet,
    Image
} from '@react-pdf/renderer';
import { OfficeSections, Thread } from '../../api/threads/types';
import { Form2309Data } from '../../pages/threads/RequestDetails';


const formatInboxDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

const formatOfficeSections = (recipient: OfficeSections) => {
    if (recipient.sectionName === "default") return recipient.sectionOffice.officeName;
    else return `${recipient.sectionName} (${recipient.sectionOffice.refNum})`
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

export default function Form2309({ thread, details }: { thread: Thread, details: Form2309Data }) { 
    
    return (
        <Document>
            <Page size='A4' style={styles.body}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColLeft}>
                            <Text style={styles.tableCellLeft}>BIR</Text>
                            <Text style={styles.tableCellLeft}>FORM 2309</Text>
                            <Text style={styles.tableCellLeft}>(REVISED OCTOBER, 1971)</Text>
                        </View>
                        <View style={styles.tableColRight}>
                            <Text style={styles.tableCellRight}>BUREAU OF INTERNAL REVENUE</Text>
                            <Text style={styles.tableCellRight}>Revenue Region No. 6 - Manila</Text>
                            <Text style={styles.tableCellRight}>{`REFERENCE SLIP # ${thread.refSlipNum}`}</Text>
                            <Text style={styles.tableCellTag}>{thread.threadTag ? thread.threadTag.tagName.toUpperCase() : ''}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.recipientCol}>
                            <Text style={styles.tableCellLeftBold}>TO:</Text>
                            <Text style={styles.tableCellLeft}>{thread.recipientList.map(recipient => formatOfficeSections(recipient)).join(', ')}</Text>
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
                            <Text style={styles.tableCellLeft}>{thread.purposeNotes ? thread.purposeNotes : thread.purpose.purposeName}</Text>
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
                            {details.signatureUrl ? (
                                <View style={styles.signatureContainer}>
                                    <Image style={styles.signatureImage} src={details.signatureUrl} />
                                </View>
                            ) : thread.author.signImage ? (
                                <View style={styles.signatureContainer}>
                                    <Image style={styles.signatureImage} src={thread.author.signImage} />
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
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: '50%',
        paddingLeft: 15
    },
    table: { 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1,
        padding: 2
    },
    tableRow: { 
        margin: "auto", 
        marginTop: 2,
        flexDirection: "row" 
    }, 
    tableColRight: { 
        width: "60%"
    },
    tableColLeft: { 
        width: "40%"
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
        fontSize: 9,
        textAlign: "left"
    },
    emptyCell: { 
        height: 30
    },
    tableCellLeftBold: { 
        margin: 2,
        fontSize: 9,
        textAlign: "left",
        fontWeight: "bold"
    },
    tableCellLeftBoldSmall: { 
        margin: 2,
        fontSize: 6,
        textAlign: "left",
        fontWeight: "bold"
    },
    tableCellRight: { 
        margin: 2,
        fontSize: 9,
        textAlign: "right"
    },
    tableCellTag: { 
        margin: 2,
        fontSize: 9,
        textAlign: "right",
        color: "red"
    },
    tableCellCenter: { 
        margin: 2,
        fontSize: 8,
        textAlign: "center"
    },
    tableCellCenterSmall: { 
        margin: 2,
        fontSize: 8,
        textAlign: "center"
    },
    signatureContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    signatureImage: {
        width: 60,
        height: 30
    }
});
  