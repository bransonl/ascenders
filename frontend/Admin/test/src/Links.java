import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Links {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver","chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.get("https://127.0.0.1:8080");

        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println(links.size());

        for (int i = 0; i < links.size(); i++){
            System.out.println(i + " " + links.get(i).getText());
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }

        for(int i = 0; i < links.size(); i++)
        {
            System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
            if (links.get(i).getAttribute("href") == null)
                continue;
            boolean staleElementLoaded = true;
            while(staleElementLoaded) {
                try {
                    driver.navigate().to(links.get(i).getAttribute("href"));
                    Thread.sleep(3000);
                    driver.navigate().back();
                    links = driver.findElements(By.tagName("a"));
                    System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                }
            }
        }
    }
}