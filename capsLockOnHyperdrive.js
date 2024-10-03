const fs = require('fs');
const path = require('path');

// Define the file path
const filePath = path.join(process.env.HOME, 'Library/LaunchAgents/com.local.KeyRemapping.plist');

// New key mapping to add
const newMapping = {
    HIDKeyboardModifierMappingSrc: '0x700000039',
    HIDKeyboardModifierMappingDst: '0x70000006D'
};

// Function to check if the mapping exists
const checkMappingExists = (content) => {
    const regex = new RegExp(/"HIDKeyboardModifierMappingSrc":\s*0x700000039/gm);
    return regex.test(content);
};

// Function to add the mapping if it doesn't exist
const addMapping = (content) => {
    let searchString = '"UserKeyMapping":';
    const userKeyMappingStart = content.indexOf(searchString);
    const userKeyMappingEnd = content.indexOf(']', userKeyMappingStart) + 1;

    if (userKeyMappingStart !== -1 && userKeyMappingEnd !== -1) {
        const newMappingString = JSON.stringify(newMapping);
        const updatedContent = content.slice(0, userKeyMappingEnd - 1) + ',' + newMappingString + content.slice(userKeyMappingEnd - 1);
        fs.writeFileSync(filePath, updatedContent);
        console.log('New key mapping added.');
    } else {
        console.log('Error: UserKeyMapping array not found.');
    }
};

// Check if the file already exists
if (fs.existsSync(filePath)) {
    console.log(`${filePath} already exists.`);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check if the specific key mapping exists
    if (checkMappingExists(content)) {
        console.log('Key mapping already exists.');
    } else {
        // If the mapping doesn't exist, add it
        addMapping(content);
    }
} else {
    // Write the initial XML content to the file
    const initialContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.local.KeyRemapping</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/hidutil</string>
        <string>property</string>
        <string>--set</string>
        <string>'{
            "UserKeyMapping":[
                {"HIDKeyboardModifierMappingSrc":0x700000064,"HIDKeyboardModifierMappingDst":0x70000004C},
                {"HIDKeyboardModifierMappingSrc":0x70000004C,"HIDKeyboardModifierMappingDst":0x700000064}
            ]
        }'</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>`;

    fs.writeFileSync(filePath, initialContent);
    console.log(`Plist created at ${filePath}`);
    addMapping(initialContent);
}
