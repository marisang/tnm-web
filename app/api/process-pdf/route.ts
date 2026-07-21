import { NextRequest, NextResponse } from 'next/server';
import { processPDF } from '@/lib/pdfProcessor';
import type { PDFProcessingResult } from '@/types/pdf-processor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json<PDFProcessingResult>(
        { success: false, error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }
    
    // Valida tipo de arquivo
    if (!file.type.includes('pdf')) {
      return NextResponse.json<PDFProcessingResult>(
        { success: false, error: 'O arquivo deve ser um PDF' },
        { status: 400 }
      );
    }
    
    // Valida tamanho (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json<PDFProcessingResult>(
        { success: false, error: 'O arquivo excede o tamanho máximo de 10MB' },
        { status: 400 }
      );
    }
    
    // Converte para buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Processa o PDF
    const processedData = await processPDF(buffer, file.name);
    
    return NextResponse.json<PDFProcessingResult>(
      { 
        success: true, 
        data: processedData 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Erro ao processar PDF:', error);
    
    return NextResponse.json<PDFProcessingResult>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao processar o arquivo' 
      },
      { status: 500 }
    );
  }
}
