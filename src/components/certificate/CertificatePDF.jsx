import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Exam from '../Testing/Exam';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    div1: {
        textAlign: "center",
        border: "10px solid #787878",
    },
    div2: {
        textAlign: "center",
        border: "5px solid #787878",
    },
    span1: {
        margin: 10,
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold"
    },
    span2: {
        margin: 10,
        textAlign: "center",
        fontSize: 25,
    },
    span3: {
        margin: 10,
        textAlign: "center",
        fontAize: 30,
    },
    span5: {
        margin: 10,
        textAlign: "center",
        fontSize: 20,
    }
});


export const CertificatePDF = (props) => {
    console.log("success",props.success);
    let d = new Date();
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.span1}>Certificate of Completion</Text>
                    <Text style={styles.span2}>This is to certify that</Text>
                    <Text style={styles.span3}>{props.exam.student?.studentName},ID:{props.exam.student?.studentId}</Text>
                    <Text style={styles.span2}>has completed the Test</Text>
                    <Text style={styles.span3}>{props.exam.test.Title}</Text>
                    <Text style={styles.span5}>with score of: {props.grade}</Text>
                    <Text style={styles.span2}>dated</Text>
                    <Text style={styles.span2}>{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.span2}>{props.success ? props.exam.test.SuccessMes : props.exam.test.FailureMes}</Text>
                </View>
            </Page>
        </Document>
    )
}
