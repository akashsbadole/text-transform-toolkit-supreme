import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import {
  base64Encode,
  base64Decode,
  textToBinary,
  binaryToText,
  csvToJson,
  caesarCipher,
  formatHtml,
  hexToText,
  textToHex,
  formatJson,
  generateMD5,
  textToMorse,
  morseToText,
  sortNumbers,
  rot13,
  testRegex,
  slugify,
  urlEncode,
  urlDecode,
  utf8Encode,
  utf8Decode,
  buildUTM,
  formatXml
} from '@/utils/textTransformers';

const TextTransformTools = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeTool, setActiveTool] = useState('base64');
  const [additionalParams, setAdditionalParams] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const tools = [
    { id: 'base64', name: 'Base64 Encoder/Decoder', mode: 'encode', icon: '64' },
    { id: 'binary', name: 'Binary Code Translator', mode: 'encode', icon: '01' },
    { id: 'csv-json', name: 'CSV to JSON Converter', icon: '📊' },
    { id: 'caesar', name: 'Caesar Cipher Tool', mode: 'encode', param: 'shift', icon: '🔐' },
    { id: 'html', name: 'HTML Formatter', icon: '🌐' },
    { id: 'hex', name: 'Hex to Text Converter', mode: 'encode', icon: '🔢' },
    { id: 'json', name: 'JSON Formatter', icon: '📝' },
    { id: 'md5', name: 'MD5 Hash Generator', icon: '🔑' },
    { id: 'morse', name: 'Morse Code Translator', mode: 'encode', icon: '📡' },
    { id: 'number-sorter', name: 'Number Sorter', icon: '🔢' },
    { id: 'rot13', name: 'ROT13 Encoder/Decoder', icon: '🔄' },
    { id: 'regex', name: 'Regex Tester', param: 'pattern', icon: '🔍' },
    { id: 'slugify', name: 'Slugify URL Generator', icon: '🔗' },
    { id: 'url', name: 'URL Encode/Decode', mode: 'encode', icon: '🔗' },
    { id: 'utf8', name: 'UTF-8 Encoder/Decoder', mode: 'encode', icon: '🌍' },
    { id: 'utm', name: 'UTM Builder', params: ['url', 'source', 'medium', 'campaign', 'term', 'content'], icon: '📊' },
    { id: 'xml', name: 'XML Formatter', icon: '📄' },
  ];

  const handleTransform = async () => {
    if (!input.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to transform",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      let result = '';
      const tool = tools.find(t => t.id === activeTool);

      if (!tool) return;

      switch (tool.id) {
        case 'base64':
          result = tool.mode === 'encode' ? base64Encode(input) : base64Decode(input);
          break;
        case 'binary':
          result = tool.mode === 'encode' ? textToBinary(input) : binaryToText(input);
          break;
        case 'csv-json':
          result = csvToJson(input);
          break;
        case 'caesar':
          result = caesarCipher(input, parseInt(additionalParams.shift || '0'));
          break;
        case 'html':
          result = formatHtml(input);
          break;
        case 'hex':
          result = tool.mode === 'encode' ? textToHex(input) : hexToText(input);
          break;
        case 'json':
          result = formatJson(input);
          break;
        case 'md5':
          result = await generateMD5(input);
          break;
        case 'morse':
          result = tool.mode === 'encode' ? textToMorse(input) : morseToText(input);
          break;
        case 'number-sorter':
          result = sortNumbers(input);
          break;
        case 'rot13':
          result = rot13(input);
          break;
        case 'regex':
          result = testRegex(input, additionalParams.pattern || '');
          break;
        case 'slugify':
          result = slugify(input);
          break;
        case 'url':
          result = tool.mode === 'encode' ? urlEncode(input) : urlDecode(input);
          break;
        case 'utf8':
          result = tool.mode === 'encode' ? utf8Encode(input) : utf8Decode(input);
          break;
        case 'utm':
          result = buildUTM({
            url: additionalParams.url || '',
            source: additionalParams.source || '',
            medium: additionalParams.medium || '',
            campaign: additionalParams.campaign || '',
            term: additionalParams.term,
            content: additionalParams.content
          });
          break;
        case 'xml':
          result = formatXml(input);
          break;
      }

      setOutput(result);
      toast({
        title: "Success",
        description: `Text transformed successfully`,
        duration: 1500,
      });
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast({
        title: "Error",
        description: `Failed to transform text`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleModeChange = (mode: string) => {
    const tool = tools.find(t => t.id === activeTool);
    if (tool) {
      tool.mode = mode;
    }
  };

  const handleParamChange = (key: string, value: string) => {
    setAdditionalParams(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = async () => {
    if (!output.trim()) {
      toast({
        title: "Empty Output",
        description: "There is no text to copy",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setAdditionalParams({});
    toast({
      title: "Text cleared",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Text Transformation Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-4">Input</h3>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your text here..."
                  className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>

              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-4">Output</h3>
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[200px] bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleTransform}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={!input.trim()}
              >
                Transform
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                disabled={!output.trim()}
              >
                Copy
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-white/10 hover:bg-white/5"
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Select Tool</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {tools.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTool(tool.id)}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                    activeTool === tool.id ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="text-[12px] text-gray-300">{tool.name}</span>
                </motion.div>
              ))}
            </div>

            {tools.find(t => t.id === activeTool)?.mode && (
              <div className="mt-4">
                <Tabs defaultValue="encode" onValueChange={handleModeChange}>
                  <TabsList className="bg-white/5">
                    <TabsTrigger value="encode" className="data-[state=active]:bg-white/20">Encode</TabsTrigger>
                    <TabsTrigger value="decode" className="data-[state=active]:bg-white/20">Decode</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            {tools.find(t => t.id === activeTool)?.param && (
              <div className="mt-4">
                <Input
                  placeholder={`Enter ${tools.find(t => t.id === activeTool)?.param}`}
                  value={additionalParams[tools.find(t => t.id === activeTool)?.param || ''] || ''}
                  onChange={(e) => handleParamChange(tools.find(t => t.id === activeTool)?.param || '', e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>
            )}

            {tools.find(t => t.id === activeTool)?.params && (
              <div className="mt-4 space-y-2">
                {tools.find(t => t.id === activeTool)?.params?.map((param) => (
                  <Input
                    key={param}
                    placeholder={`Enter ${param}`}
                    value={additionalParams[param] || ''}
                    onChange={(e) => handleParamChange(param, e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextTransformTools; 