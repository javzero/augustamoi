<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Newsletter;
use Validator;
use PDF;
use Excel;

class NewsletterController extends Controller
{

    public function index()
    {   
        $items = Newsletter::orderBy('email', 'ASC')->paginate(100); 
        return view('vadmin.newsletter.index', compact('items'));
    }

    public function saveEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|min:4|unique:newsletter,email',
        ], [
            'email.required' => 'Debe ingresar un email',
            'email.unique' => 'El email ya está registrado en nuestra base de datos'
        ]);

        if ($validator->fails())
        {
            return response()->json(['status' => 'validationError', 'message' => $validator->getMessageBag()->toArray() ]);
        }

        try 
        {

            $item = new Newsletter($request->all());
            $item->save();

            return response()->json(['status'  => 'success', 'message' => 'Te suscribíste a nuestro newsletter !' ], 200);

        } catch (\Exception $e) 
        {
            return response()->json(['status'  => 'success', 'error' => $e->getMessage() ], 200);
            dd($e->getMessage());
        }    
    }


    public function exportEmails(Request $request, $format)
    {
        
        $items = Newsletter::all();

        Excel::create('emails-para-newsletter', function($excel) use($items){
            $excel->sheet('Listado', function($sheet) use($items) {   
                $sheet->loadView('vadmin.newsletter.invoice-xls', 
                compact('items'));
            });
        })->export($format);

    }


    public function destroy(Request $request)
    {   
        $ids = json_decode('['.str_replace("'",'"',$request->id).']', true);
        // dd($ids);
        try {
            $items = Newsletter::whereIn('id',$ids)->delete();
            
            return response()->json([
                'success'   => true,
            ]); 
        }  catch (\Exception $e) {
            return response()->json([
                'success'   => false,
                'error'    => 'Error: '.$e->getMessage()
            ]);    
        }
    }
}
