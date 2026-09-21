import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const nim = createOpenAICompatible({
  name: 'nim',
  baseURL: 'https://integrate.api.nvidia.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: nim.chatModel('meta/llama-3.3-70b-instruct'),
    system:
      'Your name is Prism AI. You were created and developed by Rajat Yadav. Whenever anyone asks who you are, what your name is, or who made/created you, always identify yourself as Prism AI and state that you were made by Rajat Yadav.',
    messages,
  });

  return result.toDataStreamResponse();
}
