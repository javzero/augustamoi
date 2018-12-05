<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Cart;
use App\Settings;
use Carbon\Carbon;
use Log;

class DeleteInactiveCarts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'carts:purge';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all carts older than 24hs';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $settings = Settings::find(1);
        $time = $settings['cartPurgeTime'];
        
        Log::info('Se ejecutó el comando borrar carros | Fecha: ' . Carbon::now());
        // $inactiveCarts = Cart::where('created_at', '<', Carbon::now());
        
        // // $inactiveCarts = Cart::where('status', 'Active')->get();
        // foreach($inactiveCarts as $cart)
        // {
            
        //     dd($cart->id);
        //     // $cart->status = 'Finished';
        //     // $cart->save();
        // }
        // Log::info("Test de comando");
    }
}
