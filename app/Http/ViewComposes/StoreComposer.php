<?php 

namespace App\Http\ViewComposers;

use Illuminate\Contracts\View\View;
use App\Traits\CartTrait;
use App\Settings;
use App\CatalogBrand;

class StoreComposer
{
    use CartTrait;

	public function compose(View $view)
	{   
        $settings = Settings::findOrFail(1);
        $google_analytics = $settings->google_analytics;
        $favs = $this->getCustomerFavs();
        $activeCart = $this->activeCart();
        
        $brands = CatalogBrand::orderBy('name', 'asc')->get();
        $view
            ->with('activeCart', $activeCart)
            ->with('favs', $favs)
            ->with('settings', $settings)
            ->with('google_analytics', $google_analytics)
			->with('brands', $brands);;
	}
}