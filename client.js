console.log('Starting Websocket');
const WebSocket = require('ws')
const url = 'ws://10.10.3.25:9999'
const connection = new WebSocket(url)
 
connection.onopen = () => {
    var xml = `<?xml version="1.0" encoding="UTF-8"?>
    <PublicSafetyEnvelope version="1.0">
        <From>XML Web Test</From>
        <To />
        <Creation />
        <PublicSafety id="">
            <Query>
                <LawIncidentTable>
                    <IncidentNumber search_type="equal_to">21025681</IncidentNumber>
                    <LawIncidentNarrative innerJoin="true" parentField="IncidentNumber" childField="IncidentNumber" />
                </LawIncidentTable>
            </Query>
        </PublicSafety>
    </PublicSafetyEnvelope>`;
 // connection.send(xml) 
  console.log('Connection Established');
}
 
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
connection.onmessage = (e) => {
  console.log(e.data)
}