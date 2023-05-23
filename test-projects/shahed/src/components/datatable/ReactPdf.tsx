import React from 'react';
import './DataTable.css';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

type DataRow = string[];

type Header = {
    id: number;
    name: string;
};

type PDFDocumentProps = {
    headers: Header[];
    data: DataRow[];
};

const PDFDocument: React.FC<PDFDocumentProps> = ({ headers, data }) => (
    <Document>
        <Page>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    {headers.map((header, index) => (
                        <View key={index} style={styles.tableHeaderCell}>
                            <Text>{header.name}</Text>
                        </View>
                    ))}
                </View>
                {data.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.tableRow}>
                        {row.map((cell, colIndex) => (
                            <View key={colIndex} style={styles.tableCell}>
                                <Text>{cell}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    table: {
        // display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableHeaderCell: {
        margin: 'auto',
        marginVertical: 5,
        backgroundColor: '#eaeaea',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        padding: 5,
    },
    tableCell: {
        margin: 'auto',
        marginVertical: 5,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        padding: 5,
    },
});